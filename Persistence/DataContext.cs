using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext :IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Company> Companies { get; set; }
    public DbSet<CompanyInformation> CompanyInformations { get; set; }
    public DbSet<CustomPrompt> CustomPrompts { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<CompanyInformation>()
            .HasOne(x => x.Company)
            .WithMany(x => x.Informations)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<CustomPrompt>()
            .HasOne(x => x.Company)
            .WithMany(x => x.CustomPrompts)
            .OnDelete(DeleteBehavior.Cascade);

        
    }
}
