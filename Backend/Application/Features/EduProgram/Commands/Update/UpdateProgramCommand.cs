using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.EduProgram.Commands.Update
{
    public record UpdateProgramCommand
    (
        Guid ProgramId,
        string Name,
        string AgesOfChildrens,
        double Duration,
        Guid DirectionId
    ) : IRequest<Result>;
}
