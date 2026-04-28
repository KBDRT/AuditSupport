using Application.Common;
using Application.DTO.Programs;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramsForTeacher
{
    public record GetProgramsForTeacherQuery
    (
        Guid TeacherId
    ) : IRequest<Result<List<ShortYearDTO>, ServiceError>>;
}
