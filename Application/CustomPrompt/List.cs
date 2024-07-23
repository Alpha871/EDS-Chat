
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CustomPrompt
{
    public class List
    {
        public class Query:IRequest<Result<List<CustomPromptDTO>>>{       
        }

        public class Handler : IRequestHandler<Query, Result<List<CustomPromptDTO>>>
        {
            private readonly DataContext _context;  
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
              _context = context;
              _mapper = mapper;
            }

            public async Task<Result<List<CustomPromptDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var information = await _context
                    .CustomPrompts
                    .ProjectTo<CustomPromptDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                if(information == null) 
                   return Result<List<CustomPromptDTO>>.Failure("No prompts found");

                return Result<List<CustomPromptDTO>>.Success(information);
            }
        }
    }
}