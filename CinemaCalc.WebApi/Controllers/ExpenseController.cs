using CinemaCalc.Application.Expenses;
using CinemaCalc.Application.Expenses.Commands.CreateExpense;
using CinemaCalc.Application.Expenses.Commands.DeleteExpense;
using CinemaCalc.Application.Expenses.Commands.UpdateExpense;
using CinemaCalc.Application.Expenses.Queries.GetAllExpenses;
using CinemaCalc.Application.Expenses.Queries.GetExpenseById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CinemaCalc.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExpenseController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExpenseController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost(Name = "CreateExpense")]
    public async Task<IActionResult> Create([FromBody] NewExpenseDto expenseDto)
    {
        var expense = await _mediator.Send(new CreateExpenseCommand(expenseDto));
        return Ok(expense);
    }

    // TODO: add response types.
    [HttpGet(Name = "GetAllExpenses")]
    public async Task<IActionResult> GetAll()
    {
        var expenses = await _mediator.Send(new GetAllExpensesCommand());
        return Ok(expenses);
    }

    [HttpGet("{id}", Name = "GetExpenseById")]
    public async Task<IActionResult> GetById(int id)
    {
        var expense = await _mediator.Send(new GetExpenseByIdCommand(id));
        return Ok(expense);
    }

    [HttpPut("{id}", Name = "UpdateExpense")]
    public async Task<IActionResult> Update(int id, [FromBody] NewExpenseDto expenseDto)
    {
        var expense = await _mediator.Send(new UpdateExpenseCommand(id, expenseDto));
        return Ok(expense);
    }

    [HttpDelete("{id}", Name = "DeleteExpense")]
    public async Task<IActionResult> Delete(int id)
    {
        var expense = await _mediator.Send(new DeleteExpenseCommand(id));
        return Ok(expense);
    }
}