
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser:IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname  { get; set; }
    
        public string Role { get; set; } = "User";

        public ICollection<UserPrompt> UserPrompts { get; set; }
        public ICollection<RefreshToken> RefreshTokens {get;set;} = new List<RefreshToken>();
    }
}