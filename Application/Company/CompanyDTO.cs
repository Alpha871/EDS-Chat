using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Company
{
    public class CompanyDTO
    {
     public Guid Id { get; set; }   
     public string Name { get; set; }
     public string Description { get; set; }
     public string Instructions { get; set; }

     public ICollection<CompanyInformation> Informations { get; set; }
     public ICollection<Domain.CustomPrompt> CustomPrompts { get; set; }
    }
}