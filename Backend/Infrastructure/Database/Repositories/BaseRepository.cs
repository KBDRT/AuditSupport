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

        public async Task<Guid> AddNew(TEntity entity, CancellationToken cancellationToken = default, SaveToDb saveToDb = SaveToDb.SaveNow)
        {
            await _dbSet.AddAsync(entity, cancellationToken);

            if (saveToDb == SaveToDb.SaveNow)
            {
                await SaveChanges(cancellationToken);
            }

            return entity.Id;
        }

        public async Task AddNewRange(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default, SaveToDb saveToDb = SaveToDb.SaveNow)
        {
            await _dbSet.AddRangeAsync(entities, cancellationToken);

            if (saveToDb == SaveToDb.SaveNow)
            {
                await SaveChanges(cancellationToken);
            }
        }

        public async Task DeleteById(Guid id, CancellationToken cancellationToken = default, SaveToDb saveToDb = SaveToDb.SaveNow)
        {
            var entity = await _dbSet.FindAsync([id], cancellationToken);
            if (entity == null)
                return;

            _dbSet.Remove(entity);

            if (saveToDb == SaveToDb.SaveNow)
                await SaveChanges(cancellationToken);
        }

        public async Task<List<TEntity>?> GetAll(CancellationToken cancellationToken = default)
        {
            return await _dbSet.AsNoTracking().ToListAsync(cancellationToken);
        }

        public async Task<TEntity?> GetById(Guid id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.SingleOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public int GetRecordsCount()
        {
            return _dbSet.AsNoTracking().Count();
        }

        public async Task<List<TEntity>?> GetWithPagination(int page, int size, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                          .OrderBy(x => x.Id)
                          .Skip((page - 1) * size)
                          .Take(size)
                          .ToListAsync(cancellationToken);
        }

        public async Task SaveChanges(CancellationToken cancellationToken = default)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<TEntity> Update(TEntity entity, CancellationToken cancellationToken = default, SaveToDb saveToDb = SaveToDb.SaveNow)
        {
            _dbSet.Update(entity);
            if (saveToDb == SaveToDb.SaveNow)
            {
                await SaveChanges(cancellationToken);
            }
            return entity;
        }
    }
}
