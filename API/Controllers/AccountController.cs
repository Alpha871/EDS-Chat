
using System.Security.Claims;
using API.DTO;
using API.DTOs;
using API.Service;
using API.Service.EmailService;
using AutoMapper;
using Domain;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{   

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController:ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        private readonly TokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
         private readonly IEmailService _emailService;
        public AccountController(DataContext context, UserManager<AppUser> userManager, 
            TokenService tokenService, IMapper mapper, IConfiguration config, 
       
             IEmailService emailService)
        {
            _emailService = emailService;
            _config = config;
            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {
            var user = await _context.Users
                     .FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if(user == null) return Unauthorized();

             var callback_url = Request.Scheme + "://" + Request.Host + Url.Action("ConfirmEmail", controller:"Account",
                   values: new {email = user.Email});

            if(!user.EmailConfirmed)  {

                // _emailService.SendEmail(new EmailDto {
                //     To = loginDto.Email,
                //     Subject = "Confirm your email",
                //     Body = "Please confirm your email by clicking <a href=\"" + callback_url + "\">here</a>"
                // });

                return Unauthorized("Email not confirmed");

            }
            
      


            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if(result) {
                await SetRefreshToken(user);
                return CreateUserDto(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) {
         
          if(await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username)) {
                ModelState.AddModelError("Username", "Username taken");

                return ValidationProblem();
             
          }

          if(await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email)) {
                ModelState.AddModelError("Email", "Email taken");

             return ValidationProblem();
          }


        
          var user= new AppUser {
            UserName = registerDto.Username,
            Firstname = registerDto.Firstname,
            Lastname  =registerDto.Lastname,
            Email = registerDto.Email,
            EmailConfirmed = false,
          };

       

          var result = await  _userManager.CreateAsync(user, registerDto.Password);
        

          if(result.Succeeded) {

            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            // var email_body = "Please confirm your email by clicking <a href=\"#URL#\">here</a>";

            // // https://localhost:8080/authentication/yerifxenail/usecidesdas&code=dasdasd
            
            // var callback_url = Request.Scheme + "://" + Request.Host + Url.Action("ConfirmEmail", controller:"Account",
            //        values: new {userId = user.Id, code = code});

              var callback_url = Request.Scheme + "://" + Request.Host + Url.Action("ConfirmEmail", controller:"Account",
                   values: new {email = user.Email, code = code});

            // var body = email_body.Replace("#URL#", callback_url);

            // Send email
            Console.WriteLine("Sending email to " + registerDto.Email);

             _emailService.SendEmail(new EmailDto {
                To = registerDto.Email,
                Subject = "Confirm your email",
                Body = "This is the code to confirm your email :  " + code 
               
            });

            return Ok(new {message = "Please confirm your email with the code sent to your email"});




            

            // Generate the token


            // await SetRefreshToken(user);
            // return CreateUserDto(user);

          }

          return BadRequest(result.Errors);

        }

        [AllowAnonymous]
        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string email, string code) 
        {
            Console.WriteLine($"Email: {email}, Code: {code}");

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(code))
            {
                Console.WriteLine("Invalid parameters: Email or Code is null");
                return BadRequest("Invalid email confirmation link");
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                Console.WriteLine("User not found for email: " + email);
                return BadRequest("Invalid email parameter");
            }
            Console.WriteLine("user" + user);


            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
            {
                Console.WriteLine("Email confirmed for user: " + user.Email);
                return Ok("Thank you for confirming your email");
            }

            var errorMessages = result.Errors.Select(e => e.Description).ToList();
            if (errorMessages.Contains("Invalid token"))
            {
                return BadRequest(new { message = "Invalid token" });
            }

            return BadRequest(new { message = "Failed to confirm email", errors = errorMessages });
        }




        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser() {
            var user = await _userManager.Users
            //   .Include(p => p.Photos)
              .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            await SetRefreshToken(user);
            return CreateUserDto(user);
        }

        [AllowAnonymous]
        [HttpPost("GLogin")]
        public async Task<ActionResult<UserDto>> GoogleLogin(string accessToken) {
            

            var settings = new GoogleJsonWebSignature.ValidationSettings() {
                Audience = new List<string> {_config["Google:ClientId"]},
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(accessToken, settings);

            if(payload == null) return Unauthorized();

            

            var user = await _userManager.Users
                //.Include( p => p.Photos)
                .Where(x => x.Email == payload.Email)
            .FirstOrDefaultAsync();

            if(user != null) return CreateUserDto(user);

            user = new AppUser {
                UserName = payload.FamilyName,
                Email = payload.Email,
                Firstname = payload.GivenName,
                Lastname = payload.FamilyName,

            };

            var result = await _userManager.CreateAsync(user);

            if(!result.Succeeded) return BadRequest("Problem creating user account");

            await SetRefreshToken(user);
        
            return CreateUserDto(user);
        
        }





        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken() {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users
                //    .Include(p => p.Photos)
                   .Include( r => r.RefreshTokens)
                   .FirstOrDefaultAsync(u => u.UserName == User.FindFirstValue(ClaimTypes.Name));

            if(user == null ) return Unauthorized();
             var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);
            
            if(oldToken != null && !oldToken.IsActive) return Unauthorized();

            if(oldToken!= null) oldToken.Revoked = DateTime.UtcNow;

            return CreateUserDto(user);
    
        }

        private async Task SetRefreshToken(AppUser  user) {
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookiesOptions = new CookieOptions {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookiesOptions);
        }
        
        // [HttpPost("verify")]
        // public async Task<IActionResult> Verify(string token)
        // {
        //     var user = await _context.Users.FirstOrDefaultAsync(u => u.VerificationToken == token);
        //     if (user == null)
        //     {
        //         return BadRequest("Invalid token.");
        //     }

        //     user.VerifiedAt = DateTime.Now;
        //     await _context.SaveChangesAsync();

        //     return Ok("User verified! :)");
        // }
        


        public UserDto CreateUserDto(AppUser user) {
            return new UserDto{
                Username = user.UserName,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Token = _tokenService.CreateToken(user),
                Role = user.Role == null ? "User" : user.Role,
                // Image=user?.Photos?.FirstOrDefault(x => x.IsMain == true)?.Url
            };
        }
    }
}