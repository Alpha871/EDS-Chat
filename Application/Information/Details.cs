

using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Information
{
    public class Details
    {
        public class Query:IRequest<Result<InformationDTO>> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<InformationDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
               _mapper = mapper;
               _context = context;
            }

            public async Task<Result<InformationDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
               var information =  await _context.CompanyInformations
                                .ProjectTo<InformationDTO>(_mapper.ConfigurationProvider)
                                .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<InformationDTO>.Success(information);
            }
        }
    }
}