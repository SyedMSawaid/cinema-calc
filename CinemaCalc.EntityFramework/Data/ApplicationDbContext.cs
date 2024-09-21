using System;
using CinemaCalc.Domain.Entities;
using CinemaCalc.EntityFramework.Configurations;
using Microsoft.EntityFrameworkCore;

namespace CinemaCalc.EntityFramework.Data;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    public virtual DbSet<Expense> Expenses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        CommonConfiguration.ApplyConfigurations(modelBuilder);
    }
}
