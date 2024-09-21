using CinemaCalc.Application.Interfaces.Persistence;
using CinemaCalc.Domain.Entities;
using CinemaCalc.Persistence.Data;

namespace CinemaCalc.Persistence.Repositories;

public class ExpenseRepository(ApplicationDbContext applicationDbContext) : Repository<Expense>(applicationDbContext), IExpenseRepository
{
}
