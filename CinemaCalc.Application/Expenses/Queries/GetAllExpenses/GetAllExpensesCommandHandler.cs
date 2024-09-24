using AutoMapper;
using CinemaCalc.Application.Interfaces.Persistence;
using MediatR;

namespace CinemaCalc.Application.Expenses.Queries.GetAllExpenses;

public class GetAllExpensesCommandHandler : IRequestHandler<GetAllExpensesCommand, List<ExpenseDto>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetAllExpensesCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<List<ExpenseDto>> Handle(GetAllExpensesCommand request, CancellationToken cancellationToken)
    {
        var expenses = await _unitOfWork.ExpenseRepository.GetAll();
        var expensesDtoList = _mapper.Map<List<ExpenseDto>>(expenses);
        return expensesDtoList;
    }
}