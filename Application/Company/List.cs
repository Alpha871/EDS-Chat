using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Company
{
    public class List
    {
        public class Query:IRequest<Result<List<CompanyDTO>>>{
            
        }

        public class Handler : IRequestHandler<Query, Result<List<CompanyDTO>>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                }
          

            public async Task<Result<List<CompanyDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                 var query = await  _context.Companies
                        .Include(i => i.Informations)
                        .Include(i => i.CustomPrompts)
                        .ProjectTo<CompanyDTO>(_mapper.ConfigurationProvider)
                        .ToListAsync();
                        
                if(query == null) return Result<List<CompanyDTO>>.Failure("No company found");

                return Result<List<CompanyDTO>>.Success(query);
            }
        }
    }
}