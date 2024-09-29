using Microsoft.EntityFrameworkCore;

namespace CinemaCalc.Persistence.Configurations;

public static class CommonConfiguration
{
    public static void ApplyConfigurations(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ExpenseConfiguration());
    }
}