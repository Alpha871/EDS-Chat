
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser:IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname  { get; set; }

        

        public ICollection<UserPrompt> UserPrompts { get; set; }
    }
}