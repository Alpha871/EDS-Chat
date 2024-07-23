

using Application.Company;
using Application.CustomPrompt;
using Application.Information;
using Domain;


namespace Application.Core
{
    public class MappingProfiles :AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Domain.Company, CompanyDTO>();
            CreateMap<CompanyInformation, InformationDTO>();
            CreateMap<Domain.CustomPrompt, CustomPromptDTO>();
        }
    }

}