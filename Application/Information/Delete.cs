
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Information
{
    public class Delete
    {
        public class Command:IRequest<Result<Unit>>{
            public Guid Id { get; set; }
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
               var information = await _context.CompanyInformations.FindAsync(request.Id);

                if(information == null) return null;


                _context.Remove(information);
              var result = await _context.SaveChangesAsync() > 0;

              if(result) Result<Unit>.Success(Unit.Value);

              return Result<Unit>.Failure("Error whiling deleting the prompt");
            }
        }
    }
}