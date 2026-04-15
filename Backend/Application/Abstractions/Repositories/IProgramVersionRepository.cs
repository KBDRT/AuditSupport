using Domain.Entities;

namespace Application.Abstractions.Repositories
{
    public interface IProgramVersionRepository : IBaseRepository<ProgramVersion>
    {
        Task<int> GetLastVersion(Guid programId, CancellationToken cancellationToken = default);
    }
}
