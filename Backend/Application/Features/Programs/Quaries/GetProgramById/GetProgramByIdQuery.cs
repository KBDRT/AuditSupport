using Application.Common;
using Application.DTO.Programs;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramById
{
    public record GetProgramByIdQuery
    (
        Guid ProgramId,
        bool OnlyLastVersion
    ) : IRequest<Result<EduProgramDTO, ServiceError>>;
}
