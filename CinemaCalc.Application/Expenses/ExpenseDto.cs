namespace CinemaCalc.Application.Expenses;

public record ExpenseDto(int Id, string Name, decimal Price, decimal PercentageMarkup, decimal Total);
public record NewExpenseDto(string Name, decimal Price, decimal PercentageMarkup, decimal Total);