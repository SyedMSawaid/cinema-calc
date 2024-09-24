using AutoMapper;
using CinemaCalc.Application.Interfaces.Persistence;
using CinemaCalc.Domain.Entities;
using MediatR;

namespace CinemaCalc.Application.Expenses.Commands.UpdateExpense;

public class UpdateExpenseCommandHandler : IRequestHandler<UpdateExpenseCommand, ExpenseDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public UpdateExpenseCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ExpenseDto> Handle(UpdateExpenseCommand request, CancellationToken cancellationToken)
    {
        var expense = await _unitOfWork.ExpenseRepository.GetById(request.Id);
        // TODO: add not found.

        _mapper.Map(request.Dto, expense);
        _unitOfWork.ExpenseRepository.Update(expense);
        await _unitOfWork.CompleteAsync();
        
        var expenseDto = _mapper.Map<ExpenseDto>(expense);
        return expenseDto;
    }
}