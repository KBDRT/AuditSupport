using Application.Common;
using Application.DTO.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Commands.Create
{
    public record CreateProgramCommand
    (
        Guid TeacherId,
        string Name,
        string AgesOfChildrens,
        string Duration,
        Guid YearId,
        Guid? DirectionId
    ) : IRequest<Result<CreateOperationResponseDTO, ServiceError>>;
}

