using MediatR;

namespace CinemaCalc.Application.Expenses.Commands.DeleteExpense;

public class DeleteExpenseCommand : IRequest<ExpenseDto>
{
    public DeleteExpenseCommand(int id)
    {
        Id = id;
    }

    public int Id { get; set; }
}