
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Information
{
    public class Create
    {
        public class Command:IRequest<Result<Unit>>{
            public CompanyInformation  CompanyInformation { get; set; }
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
                var information = new CompanyInformation
                {
                    Information = request.CompanyInformation.Information
                };

                _context.CompanyInformations.Add(information);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create prompt");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}