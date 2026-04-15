using Domain.Entities;

namespace Application.Abstractions.Repositories
{
    public interface IProgramHistoryRepository : IBaseRepository<ProgramHistory>
    {
        Task<List<ProgramHistory>> GetByProgramId(Guid programId, CancellationToken cancellationToken = default);
    }
}
