using CinemaCalc.Domain.Entities;
using CinemaCalc.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace CinemaCalc.Persistence.Data;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    public virtual DbSet<Expense> Expenses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        CommonConfiguration.ApplyConfigurations(modelBuilder);
    }
    
    public void InitializeDatabase()
    {
        Database.EnsureCreated();  // This creates the database and schema
    }
}
