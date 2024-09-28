using AutoMapper;
using CinemaCalc.Application.Exceptions.Expenses;
using CinemaCalc.Application.Interfaces.Persistence;
using MediatR;

namespace CinemaCalc.Application.Expenses.Queries.GetExpenseById;

public class GetExpenseByIdCommandHandler : IRequestHandler<GetExpenseByIdCommand, ExpenseDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetExpenseByIdCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ExpenseDto> Handle(GetExpenseByIdCommand request, CancellationToken cancellationToken)
    {
        var expense = await _unitOfWork.ExpenseRepository.GetById(request.Id);
        
        if (expense is null) 
            throw new ExpenseNotFoundException(request.Id);
        
        var expenseDto = _mapper.Map<ExpenseDto>(expense);
        return expenseDto;
    }
}