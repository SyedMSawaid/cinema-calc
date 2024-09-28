using AutoMapper;
using CinemaCalc.Application.Exceptions.Expenses;
using CinemaCalc.Application.Interfaces.Persistence;
using MediatR;

namespace CinemaCalc.Application.Expenses.Commands.DeleteExpense;

public class DeleteExpenseCommandHandler : IRequestHandler<DeleteExpenseCommand, ExpenseDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public DeleteExpenseCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ExpenseDto> Handle(DeleteExpenseCommand request, CancellationToken cancellationToken)
    {
        var expense = await _unitOfWork.ExpenseRepository.GetById(request.Id);
        
        if (expense is null) 
            throw new ExpenseNotFoundException(request.Id);
        
        _unitOfWork.ExpenseRepository.Remove(expense);
        await _unitOfWork.CompleteAsync();
        
        var expenseDto = _mapper.Map<ExpenseDto>(expense);
        return expenseDto;
    }
}