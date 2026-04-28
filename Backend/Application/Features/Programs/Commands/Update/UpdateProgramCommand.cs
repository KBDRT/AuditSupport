using Application.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Commands.Update
{
    public record UpdateProgramCommand
    (
        Guid ProgramId,
        string Name,
        string AgesOfChildrens,
        string Duration,
        Guid DirectionId
    ) : IRequest<UnitResult<ServiceError>>;
}
