using Application.DTO.Common;
using Domain.Entities;
using Domain.Enums;

namespace Application.Abstractions.Repositories.Builders
{
    public interface IProgramQueryBuilder
    {
        Task<List<EduProgram>> ToListAsync(CancellationToken cancellationToken);
        IProgramQueryBuilder ForDirection(Guid directionId);
        IProgramQueryBuilder ForDirections(List<Guid> directionIds);
        IProgramQueryBuilder ForTeacher(Guid teacherid);
        IProgramQueryBuilder ForTeachers(List<Guid> teacherIds);
        IProgramQueryBuilder ForYear(Guid yearId);
        IProgramQueryBuilder IncludeVersion();
        Task<EduProgram?> SingleOrDefaultAsync(CancellationToken cancellationToken);
        IProgramQueryBuilder WithStatus(ProgramStatuses status);
        IProgramQueryBuilder WithStatuses(List<ProgramStatuses> statuses);

        IProgramQueryBuilder UsePagination(PaginationDTO pagination);

        IProgramQueryBuilder ForId(Guid programId);
    }
}
