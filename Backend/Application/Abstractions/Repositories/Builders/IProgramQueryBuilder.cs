using Domain.Entities;
using Domain.Enums;

namespace Application.Abstractions.Repositories.Builders
{
    public interface IProgramQueryBuilder
    {
        Task<List<EduProgram>> ExecuteAsync();
        IProgramQueryBuilder ForDirection(Guid directionId);
        IProgramQueryBuilder ForDirections(List<Guid> directionIds);
        IProgramQueryBuilder ForTeacher(Guid teacherid);
        IProgramQueryBuilder ForTeachers(List<Guid> teacherIds);
        IProgramQueryBuilder ForYear(Guid yearId);
        IProgramQueryBuilder IncludeVersion();
        Task<EduProgram?> SingleOrDefaultAsync();
        IProgramQueryBuilder WithStatus(ProgramStatuses status);
        IProgramQueryBuilder WithStatuses(List<ProgramStatuses> statuses);
    }
}
