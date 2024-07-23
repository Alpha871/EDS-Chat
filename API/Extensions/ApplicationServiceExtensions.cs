


using Application.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Company;





namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
         public static  IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config) {


           services.AddEndpointsApiExplorer();
           services.AddSwaggerGen();

           //flyio connection string
            
           services.AddDbContext<DataContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either FlyIO
                // connection string, or development connection string from env var.
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
                  // Pass the constructed connection string to UseNpgsql method
                    
                  
            });


        ////normal connection string

        //    services.AddDbContext<DataContext>(option => {
        //         option.UseNpgsql(config.GetConnectionString("DefaultConnection"));
        //    });

        ////heroku connection string
            //  services.AddDbContext<DataContext>(options =>
            // {
            //     var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            //     // string connStr;

            //     // Depending on if in development or production, use either Heroku-provided
            //     // connection string, or development connection string from env var.
                
            // });

                // if (env == "Development")
                // {
                //     // Use connection string from file.
                //     connStr = config.GetConnectionString("DefaultConnection");
                //     options.UseSqlite(connStr);
                // }
                // else
                // {
                //     // Use connection string provided at runtime by Heroku.
                //     var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                //     // Parse connection URL to connection string for Npgsql
                //     connUrl = connUrl.Replace("postgres://", string.Empty);
                //     var pgUserPass = connUrl.Split("@")[0];
                //     var pgHostPortDb = connUrl.Split("@")[1];
                //     var pgHostPort = pgHostPortDb.Split("/")[0];
                //     var pgDb = pgHostPortDb.Split("/")[1];
                //     var pgUser = pgUserPass.Split(":")[0];
                //     var pgPass = pgUserPass.Split(":")[1];
                //     var pgHost = pgHostPort.Split(":")[0];
                //     var pgPort = pgHostPort.Split(":")[1];

                // connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
                //  options.UseNpgsql(connStr);
            // }

                // Whether the connection string came from the local development configuration file
                // or from the environment variable from Heroku, use it to set up your DbContext.
                
            // });


            services.AddCors(option => {
                option.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithExposedHeaders("www-Authenticate", "Pagination")
                    .WithOrigins("http://localhost:5173", "https://localhost:5173");
                });
            });


            services
            .AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            
            
           

        

           return services;
        
        }
    }
}