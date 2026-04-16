using Application.Abstractions.Repositories;
using Application.Common;
using Application.Features.Reviews.Commands.Create;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Reviews.Commands.Delete
{
    public class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand, UnitResult<ServiceError>>
    {
        private readonly IBaseRepository<ProgramReview> _repository;

        public DeleteReviewCommandHandler(IBaseRepository<ProgramReview> repository)
        {
            _repository = repository;
        }


        public async Task<UnitResult<ServiceError>> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteById(request.ReviewId, cancellationToken);

            // delete from minio

            return Result.Success<ServiceError>();
        }
    }
}
