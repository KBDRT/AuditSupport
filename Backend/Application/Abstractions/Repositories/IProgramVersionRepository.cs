using Domain.Entities.ProgramContext;

namespace Application.Abstractions.Repositories
{
    public interface IProgramVersionRepository : IBaseRepository<ProgramVersion>
    {
        Task<int> GetLastVersion(Guid programId, CancellationToken cancellationToken = default);

        Task<ProgramVersion?> GetWithProgram(Guid versionId, CancellationToken cancellationToken = default);

        Task SetUnuseForAll(Guid programId, CancellationToken cancellationToken = default);
    }
}
