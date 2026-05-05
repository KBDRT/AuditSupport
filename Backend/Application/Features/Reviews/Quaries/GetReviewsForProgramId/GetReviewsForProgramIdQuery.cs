
using Application.Common;
using Application.DTO.Reviews;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Reviews.Quaries.GetReviewsForProgramId
{
    public record GetReviewsForProgramIdQuery
    (
        Guid ProgramId
    ) : IRequest<Result<List<ShortReviewResponseDTO>, ServiceError>>;
}
