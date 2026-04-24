using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Reviews.Commands.Create
{
    public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, Result<Guid, ServiceError>>
    {
        private readonly IBaseRepository<ProgramReview> _repository;

        public CreateReviewCommandHandler(IBaseRepository<ProgramReview> repository)
        {
            _repository = repository;
        }

        public async Task<Result<Guid, ServiceError>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            ProgramReview review = new()
            {
                AuditorId = request.AuditorId,
                Commentary = request.Commentary,
                Id = Guid.NewGuid(),
                IsSuccess = request.IsSuccess,
                VersionId = request.VersionId,
            };

            // file size добавить
            // добавить в minio файл

            await _repository.AddNew(review, cancellationToken);

            return Result.Success<Guid, ServiceError>(review.Id);
        }
    }
}
