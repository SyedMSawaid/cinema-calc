using CinemaCalc.Application.Expenses;
using CinemaCalc.Application.Expenses.Commands.CreateExpense;
using CinemaCalc.Application.Expenses.Commands.DeleteExpense;
using CinemaCalc.Application.Expenses.Commands.UpdateExpense;
using CinemaCalc.Application.Expenses.Queries.GetAllExpenses;
using CinemaCalc.Application.Expenses.Queries.GetExpenseById;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CinemaCalc.WebApi.Controllers;

public class ExpenseController : BaseController
{
    private readonly IMediator _mediator;

    public ExpenseController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost(Name = "CreateExpense")]
    [SwaggerResponse(StatusCodes.Status200OK, "returns created expense object", typeof(ExpenseDto))]
    public async Task<IActionResult> Create([FromBody] NewExpenseDto expenseDto)
    {
        var expense = await _mediator.Send(new CreateExpenseCommand(expenseDto));
        return Ok(expense);
    }

    [HttpGet(Name = "GetAllExpenses")]
    [SwaggerResponse(StatusCodes.Status200OK, "returns list of expenses and their total amount",
        typeof(GetAllExpensesResponse))]
    public async Task<IActionResult> GetAll()
    {
        var expenses = await _mediator.Send(new GetAllExpensesCommand());
        return Ok(expenses);
    }

    [HttpGet("{id:int}", Name = "GetExpenseById")]
    [SwaggerResponse(StatusCodes.Status200OK, "returns expense object by ID", typeof(ExpenseDto))]
    public async Task<IActionResult> GetById(int id)
    {
        var expense = await _mediator.Send(new GetExpenseByIdCommand(id));
        return Ok(expense);
    }

    [HttpPut("{id:int}", Name = "UpdateExpense")]
    [SwaggerResponse(StatusCodes.Status200OK, "returns updated expense object", typeof(ExpenseDto))]
    public async Task<IActionResult> Update(int id, [FromBody] NewExpenseDto expenseDto)
    {
        var expense = await _mediator.Send(new UpdateExpenseCommand(id, expenseDto));
        return Ok(expense);
    }

    [HttpDelete("{id:int}", Name = "DeleteExpense")]
    [SwaggerResponse(StatusCodes.Status200OK, "returns deleted expense object", typeof(ExpenseDto))]
    public async Task<IActionResult> Delete(int id)
    {
        var expense = await _mediator.Send(new DeleteExpenseCommand(id));
        return Ok(expense);
    }
}