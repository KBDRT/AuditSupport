using Application.Common;
using Application.DTO.Reviews;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Reviews.Quaries.GetReviewById
{
    public record GetReviewByIdQuery
    (
        Guid ReviewId
    ) : IRequest<Result<GetReviewResponseDTO, ServiceError>>;
}
