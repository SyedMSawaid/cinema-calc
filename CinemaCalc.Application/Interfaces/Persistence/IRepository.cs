using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace CinemaCalc.Application.Interfaces.Persistence;

public interface IRepository<TEntity> : IDisposable where TEntity : class
{
    ValueTask<EntityEntry<TEntity>> AddAsync(TEntity entity);
    Task AddRangeAsync(IEnumerable<TEntity> entities);
    ValueTask<TEntity?> GetById(int id);
    void Update(TEntity entity);
    void Remove(TEntity entity);
    Task<List<TEntity>> GetAll();
}