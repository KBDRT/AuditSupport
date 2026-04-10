using Application.Abstractions.Repositories;
using Domain.Entities.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : Identifier
    {
        protected readonly AppDBContext _context;
        protected readonly DbSet<TEntity> _dbSet;

        public BaseRepository(AppDBContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        public async Task<Guid> AddNewAsync(TEntity entity, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }

        public async Task AddNewRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddRangeAsync(entities, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            await _dbSet.Where(x => x.Id == id).ExecuteDeleteAsync(cancellationToken);
        }

        public async Task<List<TEntity>?> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _dbSet.AsNoTracking().ToListAsync(cancellationToken);
        }

        public async Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.SingleOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public int GetRecordsCount()
        {
            return _dbSet.AsNoTracking().Count();
        }

        public async Task<List<TEntity>?> GetWithPaginationAsync(int page, int size, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                          .Skip((page - 1) * size)
                          .Take(size)
                          .ToListAsync(cancellationToken);
        }

        public async Task<TEntity> UpdateAsync(TEntity entity, CancellationToken cancellationToken = default)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
            return entity;
        }
    }
}
