using MediatR;

namespace CinemaCalc.Application.Expenses.Queries.GetExpenseById;

public class GetExpenseByIdCommand : IRequest<ExpenseDto>
{
    public GetExpenseByIdCommand(int id)
    {
        Id = id;
    }

    public int Id { get; set; }
}