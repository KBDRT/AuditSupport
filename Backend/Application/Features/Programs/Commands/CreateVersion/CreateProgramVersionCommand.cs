using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Commands.CreateVersion
{
    public record CreateProgramVersionCommand
    (
        Guid ProgramId,
        string Changes,
        Stream File
    ) : IRequest<Result<Guid, ServiceError>>;
}

