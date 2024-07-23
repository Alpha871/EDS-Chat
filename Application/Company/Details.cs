

using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Company
{
    public class Details
    {
        public class Query:IRequest<Result<CompanyDTO>> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CompanyDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
               _mapper = mapper;
               _context = context;
            }

            public async Task<Result<CompanyDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
               var company =  await _context.CompanyInformations
                                .ProjectTo<CompanyDTO>(_mapper.ConfigurationProvider)
                                .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<CompanyDTO>.Success(company);
            }
        }
    }
}