using AutoMapper;
using CinemaCalc.Application.Expenses.Commands.CreateExpense;
using CinemaCalc.Domain.Entities;

namespace CinemaCalc.Application.Expenses;

public class ExpenseMappers : Profile
{
    public ExpenseMappers()
    {
        CreateMap<Expense, ExpenseDto>()
            .ReverseMap();
        CreateMap<NewExpenseDto, Expense>()
            .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.PercentageMarkup / 100 * src.Price + src.Price));
    }
}