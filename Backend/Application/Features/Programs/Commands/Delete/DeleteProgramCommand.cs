using Application.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Commands.Delete
{
    public record DeleteProgramCommand
    (
        Guid ProgramId
    ) : IRequest<UnitResult<ServiceError>>;
}
