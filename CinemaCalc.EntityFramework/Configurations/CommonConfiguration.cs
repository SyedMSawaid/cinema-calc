using System;
using Microsoft.EntityFrameworkCore;

namespace CinemaCalc.EntityFramework.Configurations;

public static class CommonConfiguration
{
    public static void ApplyConfigurations(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ExpenseConfiguration());
    }
}
