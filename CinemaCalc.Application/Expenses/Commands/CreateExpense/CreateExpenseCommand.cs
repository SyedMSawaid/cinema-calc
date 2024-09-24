using MediatR;

namespace CinemaCalc.Application.Expenses.Commands.CreateExpense;

public class CreateExpenseCommand : IRequest<ExpenseDto>
{
    public CreateExpenseCommand(NewExpenseDto dto)
    {
        Dto = dto;
    }
    
    public NewExpenseDto Dto { get; set; }
}