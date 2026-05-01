using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Enums;
using MediatR;

namespace Application.Features.Programs.Commands.ChangeStatus
{
    public record ChangeProgramStatusCommand
    (
        Guid ProgramId,
        ProgramStatuses NewStatus,
        Guid? VersionId
    ) : IRequest<UnitResult<ServiceError>>;
}
