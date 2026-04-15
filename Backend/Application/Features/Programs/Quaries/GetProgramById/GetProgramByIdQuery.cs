using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramById
{
    public record GetProgramByIdQuery
    (
        Guid ProgramId

    ) : IRequest<Result<EduProgram, ServiceError>>;
}
