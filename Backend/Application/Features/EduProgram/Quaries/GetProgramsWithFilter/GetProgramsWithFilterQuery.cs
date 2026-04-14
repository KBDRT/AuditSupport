using Application.DTO;
using CSharpFunctionalExtensions;
using Domain.Enums;
using MediatR;

namespace Application.Features.EduProgram.Quaries.GetProgramWithFilter
{
    public record GetProgramsWithFilterQuery
    (
        Guid YearId,
        List<Guid>? Teachers,
        PaginationDTO? Pagination,
        List<ProgramStatuses>? Statuses,
        List<Guid>? Directions
    ) : IRequest<Result>;
}
