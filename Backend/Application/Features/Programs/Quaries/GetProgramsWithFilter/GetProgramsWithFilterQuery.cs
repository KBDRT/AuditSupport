using Application.Common;
using Application.DTO.Common;
using Application.DTO.Programs;
using CSharpFunctionalExtensions;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramsWithFilter
{
    public record GetProgramsWithFilterQuery
    (
        Guid YearId,
        List<Guid>? Teachers,
        PaginationDTO? Pagination,
        List<ProgramStatuses>? Statuses,
        List<Guid>? Directions
    ) : IRequest<Result<List<EduProgramShortDTO>,ServiceError>>;
}
