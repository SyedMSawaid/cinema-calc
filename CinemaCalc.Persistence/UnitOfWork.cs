using CinemaCalc.Application.Interfaces.Persistence;
using CinemaCalc.Persistence.Data;
using Microsoft.EntityFrameworkCore.Storage;

namespace CinemaCalc.Persistence;


public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly ApplicationDbContext _applicationDbContext;
    private IDbContextTransaction? _contextTransaction;

    public UnitOfWork(
        ApplicationDbContext applicationDbContext,
       IExpenseRepository expenseRepository
    )
    {
        _applicationDbContext = applicationDbContext;
        ExpenseRepository = expenseRepository;
    }

    public IExpenseRepository ExpenseRepository { get; }

    public void Dispose()
    {
        _applicationDbContext.Dispose();
        GC.SuppressFinalize(this);
    }

    public Task<int> CompleteAsync()
    {
        return _applicationDbContext.SaveChangesAsync();
    }

    public async Task BeginTransactionAsync()
    {
        if (_contextTransaction != null) return;

        _contextTransaction = await _applicationDbContext.Database
            .BeginTransactionAsync()
            .ConfigureAwait(false);
    }

    public void RollbackTransaction()
    {
        try
        {
            _contextTransaction?.Rollback();
        }
        finally
        {
            if (_contextTransaction != null)
            {
                _contextTransaction.Dispose();
                _contextTransaction = null;
            }
        }
    }

    public Task CommitTransactionAsync()
    {
        try
        {
            _contextTransaction?.Commit();
        }
        catch
        {
            RollbackTransaction();
            throw;
        }
        finally
        {
            if (_contextTransaction != null)
            {
                _contextTransaction.Dispose();
                _contextTransaction = null;
            }
        }

        return Task.CompletedTask;
    }
}