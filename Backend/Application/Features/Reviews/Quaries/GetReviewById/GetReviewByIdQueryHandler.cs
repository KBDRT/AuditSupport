using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Reviews.Quaries.GetReviewById
{
    public class GetReviewByIdQueryHandler : IRequestHandler<GetReviewByIdQuery, Result<ProgramReview, ServiceError>>
    {

        private readonly IBaseRepository<ProgramReview> _repository;

        public GetReviewByIdQueryHandler(IBaseRepository<ProgramReview> repository)
        {
            _repository = repository;
        }

        public async Task<Result<ProgramReview, ServiceError>> Handle(GetReviewByIdQuery request, CancellationToken cancellationToken)
        {
            var review = await _repository.GetById(request.ReviewId, cancellationToken);
            if (review == null)
            {
                return Result.Failure<ProgramReview, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            return Result.Success<ProgramReview, ServiceError>(review);
        }
    }
}
