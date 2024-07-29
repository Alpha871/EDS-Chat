


using Application.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Company;
using Application.Interfaces;
using Infrastructure.Security;
using API.Service.EmailService;





namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
         public static  IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config) {


           services.AddEndpointsApiExplorer();
           services.AddSwaggerGen();


           services.AddDbContext<DataContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("DefaultConnection");
                      options.UseSqlite(connStr);
                }
                else
                {
                    // Use connection string provided at runtime by FlyIO.
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];
                    var updatedHost = pgHost.Replace("flycast", "internal");

                    connStr = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";

                   options.UseNpgsql(connStr);
                }
                    
                  
            });




            services.AddCors(option => {
                option.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithExposedHeaders("www-Authenticate", "Pagination")
                    .WithOrigins("http://localhost:3000", "https://localhost:3000"
                    ,"https://test-eds-ai.aris888.io/");
                });
            });


            services
            .AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IEmailService, EmailService>();
            
        

           return services;
        
        }
    }
}