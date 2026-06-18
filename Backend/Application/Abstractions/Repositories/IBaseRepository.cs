namespace Application.Abstractions.Repositories
{
    public enum SaveToDb
    {
        SaveNow,
        Deferred
    }


    public interface IBaseRepository<TEntity> where TEntity : class
    {
        public Task<Guid> AddNew(TEntity entity, CancellationToken cancellationToken = default, SaveToDb saveToDb = SaveToDb.SaveNow);

        public Task AddNewRange(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default, SaveToDb saveToDb = SaveToDb.SaveNow);

        public Task DeleteById(Guid id, CancellationToken cancellationToken = default, SaveToDb saveToDb = SaveToDb.SaveNow);

        public Task<TEntity> Update(TEntity entity, CancellationToken cancellationToken = default, SaveToDb saveToDb = SaveToDb.SaveNow);

        public Task SaveChanges(CancellationToken cancellationToken = default);

        public int GetRecordsCount();

        public Task<TEntity?> GetById(Guid id, CancellationToken cancellationToken = default);

        public Task<List<TEntity>?> GetWithPagination(int page, int size, CancellationToken cancellationToken = default);

        public Task<List<TEntity>?> GetAll(CancellationToken cancellationToken = default);
    }
}
