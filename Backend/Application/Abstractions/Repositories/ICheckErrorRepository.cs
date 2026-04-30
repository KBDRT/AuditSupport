using Domain.Entities.ProgramContext;

namespace Application.Abstractions.Repositories
{
    public interface ICheckErrorRepository : IBaseRepository<CheckError>
    {
        Task<List<CheckError>> GetErrorsByCheckId(Guid checkId, CancellationToken cancellationToken = default);
    }
}
