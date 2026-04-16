using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Reviews.Quaries.GetReviewFile
{
    public record GetReviewFileQuery
    (
        Guid ReviewId
    ) : IRequest<Result<Stream, ServiceError>>;
}
