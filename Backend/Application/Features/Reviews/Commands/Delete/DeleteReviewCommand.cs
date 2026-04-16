using Application.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Reviews.Commands.Delete
{
    public record DeleteReviewCommand
    (
        Guid ReviewId
    ) : IRequest<UnitResult<ServiceError>>;
}
