using Application.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Reviews.Commands.Update
{
    public record UpdateReviewCommand
    (
        Guid ReviewId,
        string Commentary,
        Stream? File,
        bool IsSuccess,
        bool IsFinished
    ) : IRequest<UnitResult<ServiceError>>;
}
