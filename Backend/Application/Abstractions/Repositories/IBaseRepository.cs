namespace Application.Abstractions.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        public Task<Guid> AddNewAsync(TEntity entity, CancellationToken cancellationToken = default);

        public Task AddNewRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);

        public Task DeleteByIdAsync(Guid id, CancellationToken cancellationToken = default);

        public Task<TEntity> UpdateAsync(TEntity entity, CancellationToken cancellationToken = default);

        public int GetRecordsCount();

        public Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        public Task<List<TEntity>?> GetWithPaginationAsync(int page, int size, CancellationToken cancellationToken = default);

        public Task<List<TEntity>?> GetAllAsync(CancellationToken cancellationToken = default);


    }
}
