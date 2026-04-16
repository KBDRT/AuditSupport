using Application.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Commands.Create
{
    public record CreateProgramCommand
    (
        Guid TeacherId,
        string Name,
        string AgesOfChildrens,
        double Duration,
        Guid YearId,
        Guid DirectionId
    ) : IRequest<UnitResult<ServiceError>>;
}

