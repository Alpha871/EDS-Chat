
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Information
{
    public class List
    {
        public class Query:IRequest<Result<List<InformationDTO>>>{       
        }

        public class Handler : IRequestHandler<Query, Result<List<InformationDTO>>>
        {
            private readonly DataContext _context;  
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
              _context = context;
              _mapper = mapper;
            }

            public async Task<Result<List<InformationDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var information = await _context
                    .CompanyInformations
                    .ProjectTo<InformationDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                if(information == null) 
                   return Result<List<InformationDTO>>.Failure("No prompts found");

                return Result<List<InformationDTO>>.Success(information);
            }
        }
    }
}