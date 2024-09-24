using CinemaCalc.Application.Expenses;
using CinemaCalc.Application.Expenses.Queries.GetAllExpenses;
using CinemaCalc.Application.Interfaces.Persistence;
using CinemaCalc.Persistence;
using CinemaCalc.Persistence.Data;
using CinemaCalc.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CinemaCalc.WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;

        // Add services to the container.
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
        builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
        builder.Services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssemblyContaining<GetAllExpensesCommand>());
        builder.Services.AddAutoMapper(typeof(ExpenseMappers));

        builder.Services.AddControllers();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}