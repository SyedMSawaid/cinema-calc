using CinemaCalc.Application.Interfaces.Persistence;
using CinemaCalc.Domain.Entities;
using CinemaCalc.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace CinemaCalc.Persistence.Repositories;

public abstract class Repository<TEntity>(ApplicationDbContext applicationDbContext) : IRepository<TEntity> where TEntity : BaseEntity
{
    private readonly ApplicationDbContext _applicationDbContext = applicationDbContext;

    public void Dispose()
    {
        _applicationDbContext.Dispose();
        GC.SuppressFinalize(this);
    }

    public ValueTask<EntityEntry<TEntity>> AddAsync(TEntity entity)
    {
        return _applicationDbContext.Set<TEntity>().AddAsync(entity);
    }

    public Task AddRangeAsync(IEnumerable<TEntity> entities)
    {
        return _applicationDbContext.Set<TEntity>().AddRangeAsync(entities);
    }

    public ValueTask<TEntity?> GetById(int id)
    {
        return _applicationDbContext.Set<TEntity>().FindAsync(id);
    }

    public void Update(TEntity entity)
    {
        _applicationDbContext.Set<TEntity>().Update(entity);
    }

    public void Remove(TEntity entity)
    {
        _applicationDbContext.Set<TEntity>().Remove(entity);
    }

    public Task<List<TEntity>> GetAll()
    {
        return _applicationDbContext.Set<TEntity>().OrderBy(x => x.Id).ToListAsync();
    }
}
