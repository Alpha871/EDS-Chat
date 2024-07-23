
using Application.Core;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Company
{
    public class Update
    {
        public class Command:IRequest<Result<Unit>>{
            public Guid Id { get; set; }

            public string  Description { get; set; }

            public string Instructions { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
              _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                 var company = await _context.Companies.FindAsync(request.Id);

                if(company == null) return null;

                company.Description = request.Description ?? company.Description;
                company.Instructions = request.Instructions ?? company.Instructions;
                _context.Entry(company).State = EntityState.Modified;

                var result = await _context.SaveChangesAsync() > 0;

                if(result) Result<Unit>.Success(Unit.Value);

              return Result<Unit>.Failure("Error whiling updating the company");
                
            }
        }
    }
}