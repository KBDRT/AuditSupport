using Application.DTO.Programs;
using Domain.Entities.ProgramContext;
using Domain.Entities.References;

namespace Application.Abstractions.Repositories
{
    public interface IEduYearRepository : IBaseRepository<EduYear>
    {
        Task<List<ShortYearDTO>> GetGroupedByTeacher(Guid teacherId, CancellationToken cancellationToken = default);
    }
}
