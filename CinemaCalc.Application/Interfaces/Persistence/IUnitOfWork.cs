namespace CinemaCalc.Application.Interfaces.Persistence;

public interface IUnitOfWork
{
    public IExpenseRepository ExpenseRepository { get; }
    Task<int> CompleteAsync();
    Task BeginTransactionAsync();
    void RollbackTransaction();
    Task CommitTransactionAsync();
}