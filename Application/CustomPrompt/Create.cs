
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.CustomPrompt
{
    public class Create
    {
        public class Command:IRequest<Result<Unit>>{
            public Domain.CustomPrompt  CustomPrompt { get; set; }
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
                var information = new Domain.CustomPrompt
                {
                    Prompt = request.CustomPrompt.Prompt,
                    Emoji = request.CustomPrompt.Emoji,
                };

                _context.CustomPrompts.Add(information);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create prompt");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}