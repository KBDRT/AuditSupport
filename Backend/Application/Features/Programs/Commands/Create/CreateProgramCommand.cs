using CSharpFunctionalExtensions;
using Domain.Entities;
using Domain.Values;
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
    ) : IRequest<Result>;
}

