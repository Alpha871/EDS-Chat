
using Application.Core;
using MediatR;
using Persistence;

namespace Application.CustomPrompt
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
               var prompt = await _context.CustomPrompts.FindAsync(request.Id);

                if(prompt == null) return null;


                _context.Remove(prompt);
              var result = await _context.SaveChangesAsync() > 0;

              if(result) Result<Unit>.Success(Unit.Value);

              return Result<Unit>.Failure("Error whiling deleting the prompt");
            }
        }
    }
}