

using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        public string Username { get; set; }


        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$",
          ErrorMessage ="Password must be complex!")]
        public string Password {get; set;}
    }
}