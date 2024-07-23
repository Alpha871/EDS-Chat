using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Company
    {
        public Company() {}
        
        
        public Guid Id  { get; set; }
        public string Name { get; set; }

        public string  Description { get; set; }

        public string Instructions { get; set; }

       public ICollection<CompanyInformation> Informations { get; set; } = new List<CompanyInformation>();
       public ICollection<CustomPrompt> CustomPrompts { get; set; } = new List<CustomPrompt>();
    }
}