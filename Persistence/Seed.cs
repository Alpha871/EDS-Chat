
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager) {

        if(!context.Companies.Any() && !userManager.Users.Any()) { 

            await userManager.CreateAsync(new AppUser {
                UserName = "alpha",
                Firstname = "alpha",
                Lastname = "bah",
                Email="bah@test.com"
            },"Pa$$w0rd" );
        
            var company = new Company
            {
                Name ="EDS-Global",
                Description = "We are a Oil  company",
                Instructions = "Make us proud"

            };
            await context.Companies.AddAsync(company);

            await context.SaveChangesAsync();
            

        }
    }
}
}