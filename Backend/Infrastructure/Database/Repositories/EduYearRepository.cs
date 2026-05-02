using Application.Abstractions.Repositories;
using Application.DTO.Programs;
using Domain.Entities.References;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories
{
    public class EduYearRepository(AppDBContext context) : BaseRepository<EduYear>(context), IEduYearRepository
    {
        public async Task<List<ShortYearDTO>> GetGroupedByTeacher(Guid teacherId, CancellationToken cancellationToken = default)
        {
            return await context.EduYears.OrderByDescending(x => x.StartYear)
                .Select(year => new ShortYearDTO(
                    year.Id,
                    year.Period,
                    year.IsOpened,
                    context.EduPrograms.OrderByDescending(x => x.CreatedDate)
                        .Where(p => p.EduYearId == year.Id && p.TeacherId == teacherId && p.ProgramStatus != ProgramStatuses.Deleted)
                        .Select(p => new ShortProgramDTO(
                            p.Id,
                            p.Name,
                            p.ProgramStatus
                        ))
                        .ToList()
                ))
                .ToListAsync(cancellationToken);
        }
    }
}
