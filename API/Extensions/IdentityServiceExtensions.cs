


using System.Text;
using API.Service;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;


using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddAdentityServices(this IServiceCollection services, IConfiguration config) {
            services.AddIdentityCore<AppUser>(option =>  {
                option.Password.RequireNonAlphanumeric =false;
                option.User.RequireUniqueEmail = true;
                // option.User.AllowedUserNameCharacters = "";

            })
            .AddEntityFrameworkStores<DataContext>();

            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option => {
                    option.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = Key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });

            services.AddScoped<TokenService>();


            return services;
        
        }
    }
}