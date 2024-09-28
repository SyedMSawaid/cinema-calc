namespace CinemaCalc.Application.Expenses.Queries.GetAllExpenses;


public record GetAllExpensesResponse(List<ExpenseDto> Expenses, decimal Total);