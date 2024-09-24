using AutoMapper;
using CinemaCalc.Application.Interfaces.Persistence;
using CinemaCalc.Domain.Entities;
using MediatR;

namespace CinemaCalc.Application.Expenses.Commands.CreateExpense;

public class CreateExpenseCommandHandler : IRequestHandler<CreateExpenseCommand, ExpenseDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CreateExpenseCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ExpenseDto> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
    {
        var expense = Expense.Create(request.Dto.Name, request.Dto.Price, request.Dto.PercentageMarkup);
        
        var newExpense = await _unitOfWork.ExpenseRepository.AddAsync(expense);
        await _unitOfWork.CompleteAsync();
        
        var expenseDto = _mapper.Map<ExpenseDto>(newExpense.Entity);
        return expenseDto;
    }
}