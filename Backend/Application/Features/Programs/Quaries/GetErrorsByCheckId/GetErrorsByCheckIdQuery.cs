using Application.Common;
using Application.DTO.Programs;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Quaries.GetErrorsByCheckId
{
    public record GetErrorsByCheckIdQuery
    (
        Guid CheckId

    ) : IRequest<Result<List<ShortCheckErrorDTO>, ServiceError>>;
}
