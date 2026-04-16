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
        double Duration,
        Guid DirectionId
    ) : IRequest<UnitResult<ServiceError>>;
}
