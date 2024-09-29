using MediatR;

namespace CinemaCalc.Application.Expenses.Commands.UpdateExpense;

public class UpdateExpenseCommand : IRequest<ExpenseDto>
{
    public UpdateExpenseCommand(int id, NewExpenseDto dto)
    {
        Id = id;
        Dto = dto;
    }

    public int Id { get; set; }
    public NewExpenseDto Dto { get; set; }
}