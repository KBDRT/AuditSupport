using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.EduProgram.Commands.Delete
{
    public record DeleteProgramCommand
    (
        Guid ProgramId
    ) : IRequest<Result>;
}
