

using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CustomPrompt
{
    public class Details
    {
        public class Query:IRequest<Result<CustomPromptDTO>> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CustomPromptDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
               _mapper = mapper;
               _context = context;
            }

            public async Task<Result<CustomPromptDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
               var prompt =  await _context.CustomPrompts
                                .ProjectTo<CustomPromptDTO>(_mapper.ConfigurationProvider)
                                .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<CustomPromptDTO>.Success(prompt);
            }
        }
    }
}