using AutoMapper;
using CinemaCalc.Application.Expenses.Commands.CreateExpense;
using CinemaCalc.Domain.Entities;

namespace CinemaCalc.Application.Expenses;

public class ExpenseMappers : Profile
{
    public ExpenseMappers()
    {
        CreateMap<ExpenseDto, Expense>().ReverseMap();
        CreateMap<NewExpenseDto, Expense>().ReverseMap();
    }
}