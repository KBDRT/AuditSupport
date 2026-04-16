using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Reviews.Quaries.GetReviewById
{
    public record GetReviewByIdQuery
    (
        Guid ReviewId
    ) : IRequest<Result<ProgramReview,ServiceError>>;
}
