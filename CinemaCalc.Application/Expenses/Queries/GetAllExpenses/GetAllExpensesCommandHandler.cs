using AutoMapper;
using CinemaCalc.Application.Interfaces.Persistence;
using CinemaCalc.Domain.Entities;
using MediatR;

namespace CinemaCalc.Application.Expenses.Queries.GetAllExpenses;

public class GetAllExpensesCommandHandler : IRequestHandler<GetAllExpensesCommand, GetAllExpensesResponse>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetAllExpensesCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<GetAllExpensesResponse> Handle(GetAllExpensesCommand request, CancellationToken cancellationToken)
    {
        var expenses = await _unitOfWork.ExpenseRepository.GetAll();
        var expensesDtoList = _mapper.Map<List<ExpenseDto>>(expenses);

        var total = expenses.Sum(x => x.Total);
        var response = new GetAllExpensesResponse(expensesDtoList, total);
        
        return response;
    }
}