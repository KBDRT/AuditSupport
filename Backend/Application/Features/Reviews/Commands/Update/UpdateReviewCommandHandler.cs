using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Reviews.Commands.Update
{
    public class UpdateReviewCommandHandler : IRequestHandler<UpdateReviewCommand, UnitResult<ServiceError>>
    {

        private readonly IBaseRepository<ProgramReview> _repository;

        public UpdateReviewCommandHandler(IBaseRepository<ProgramReview> repository)
        {
            _repository = repository;
        }

        public async Task<UnitResult<ServiceError>> Handle(UpdateReviewCommand request, CancellationToken cancellationToken)
        {
            var review = await _repository.GetById(request.ReviewId, cancellationToken);
            if (review == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            review.Commentary = request.Commentary;
            review.IsSuccess = request.IsSuccess;

            // change file

            return Result.Success<ServiceError>();
        }
    }
}
