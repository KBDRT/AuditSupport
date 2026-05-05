using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Reviews.Commands.Create
{
    public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, Result<CreateOperationResponseDTO, ServiceError>>
    {
        private readonly IBaseRepository<ProgramReview> _repository;
        private readonly IProgramVersionRepository _versionRepository;

        public CreateReviewCommandHandler(IBaseRepository<ProgramReview> repository,
                                          IProgramVersionRepository versionRepository)
        {
            _repository = repository;
            _versionRepository = versionRepository;
        }

        public async Task<Result<CreateOperationResponseDTO, ServiceError>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            var version = await _versionRepository.GetActiveForReview(request.ProgramId, cancellationToken);
            if (version == null)
            {
                return Result.Failure<CreateOperationResponseDTO, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }


            ProgramReview review = new()
            {
                AuditorId = request.AuditorId,
                ProgramVersion = version,
                //Commentary = request.Commentary,
                Id = Guid.NewGuid(),
                //IsSuccess = request.IsSuccess,
                //VersionId = version.Id,
            };

            // file size добавить
            // добавить в minio файл

            await _repository.AddNew(review, cancellationToken);

            return Result.Success<CreateOperationResponseDTO, ServiceError>(new(review.Id));
        }
    }
}
