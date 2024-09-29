using CinemaCalc.Application.Exceptions.BaseExceptions;
using CinemaCalc.Domain.Entities;

namespace CinemaCalc.Application.Exceptions.Expenses;

public class ExpenseNotFoundException : EntityNotFoundException
{
    public ExpenseNotFoundException(object key)
        : base(nameof(Expense), key, $"{nameof(Expense)} with ID: {key} not found.")
    {
    }
}