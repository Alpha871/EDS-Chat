using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserPrompt
    {
        public Guid Id { get; set; }
        public string Prompt { get; set; }

        public AppUser AppUser { get; set; }
    }
}