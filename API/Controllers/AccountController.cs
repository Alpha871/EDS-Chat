
using System.Security.Claims;
using API.DTO;
using API.DTOs;
using API.Service;
using AutoMapper;
using Domain;
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

        private readonly TokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        public AccountController(DataContext context, UserManager<AppUser> userManager, 
            TokenService tokenService, IMapper mapper)
        {
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

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if(result) {
                // await SetRefreshToken(user);
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
            Email = registerDto.Email
          };

       

          var result = await  _userManager.CreateAsync(user, registerDto.Password);
        

          if(result.Succeeded) {
            // await SetRefreshToken(user);
            return CreateUserDto(user);

          }

          return BadRequest(result.Errors);

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser() {
            var user = await _userManager.Users
            //   .Include(p => p.Photos)
              .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            // await SetRefreshToken(user);
            return CreateUserDto(user);
        }

        // [HttpGet()]
        // public async Task<ActionResult<List<ListUserDto>>> GetUsers(string username) {
        //   var userFirst = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
        //   if(userFirst == null) return BadRequest("no user");

        //    var list = await _context.Users
        //                     .Include(p => p.Photos)
        //                     .ToListAsync();
        //     var users = new List<ListUserDto>();
        
        //     foreach(var item in list) {
        //         var user = new ListUserDto {
        //             DisplayName = item.DisplayName,
        //             Username = item.UserName,
        //             Image = item.Photos.FirstOrDefault(x => x.IsMain).Url
        //         };
        //         users.Add(user);
        //     }

                   
                    
        //     if(users == null) return BadRequest("Problem getting all users");
        //     return users;
        // }


        // [Authorize]
        // [HttpPost("refreshToken")]
        // public async Task<ActionResult<UserDto>> RefreshToken() {
        //     var refreshToken = Request.Cookies["refreshToken"];
        //     var user = await _userManager.Users
        //         //    .Include(p => p.Photos)
        //            .Include( r => r.RefreshTokens)
        //            .FirstOrDefaultAsync(u => u.UserName == User.FindFirstValue(ClaimTypes.Name));

        //     if(user == null ) return Unauthorized();
        //      var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);
            
        //     if(oldToken != null && !oldToken.IsActive) return Unauthorized();

        //     if(oldToken!= null) oldToken.Revoked = DateTime.UtcNow;

        //     return CreateUserDto(user);
    
        // }

        // private async Task SetRefreshToken(AppUser  user) {
        //     var refreshToken = _tokenService.GenerateRefreshToken();

        //     user.RefreshTokens.Add(refreshToken);
        //     await _userManager.UpdateAsync(user);

        //     var cookiesOptions = new CookieOptions {
        //         HttpOnly = true,
        //         Expires = DateTime.UtcNow.AddDays(7)
        //     };

        //     Response.Cookies.Append("refreshToken", refreshToken.Token, cookiesOptions);
        // }

        


        public UserDto CreateUserDto(AppUser user) {
            return new UserDto{
                Username = user.UserName,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Token = _tokenService.CreateToken(user),
                // Image=user?.Photos?.FirstOrDefault(x => x.IsMain == true)?.Url
            };
        }
    }
}