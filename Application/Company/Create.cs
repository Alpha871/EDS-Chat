using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Company
{
    public class Create
    {
        public class Command:IRequest<Result<Unit>>{
       
            public Domain.Company Company { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
             public Handler(DataContext context) {
                _context = context;

             }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var Company = new Domain.Company
                {
                    Name = request.Company.Name,
                    Description = request.Company.Description,
                    Instructions = request.Company.Instructions
                };

                _context.Companies.Add(Company);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create Company");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}