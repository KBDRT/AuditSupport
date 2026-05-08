using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using Domain.Enums;
using MediatR;

namespace Application.Features.Reviews.Commands.Create
{
    public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, Result<CreateOperationResponseDTO, ServiceError>>
    {
        private readonly IBaseRepository<ProgramReview> _repository;
        private readonly IProgramVersionRepository _versionRepository;
        private readonly IBaseRepository<EduProgram> _programRepository;
        private readonly IBaseRepository<ProgramHistory> _historyRepository;

        public CreateReviewCommandHandler(IBaseRepository<ProgramReview> repository,
                                          IProgramVersionRepository versionRepository,
                                          IBaseRepository<EduProgram> programRepository,
                                          IBaseRepository<ProgramHistory> historyRepository)
        {
            _repository = repository;
            _versionRepository = versionRepository;
            _programRepository = programRepository;
            _historyRepository = historyRepository;
        }

        public async Task<Result<CreateOperationResponseDTO, ServiceError>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            var version = await _versionRepository.GetActiveForReview(request.ProgramId, cancellationToken);
            if (version == null)
            {
                return Result.Failure<CreateOperationResponseDTO, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }


            var program = await _programRepository.GetById(version.ProgramId, cancellationToken);
            if (program == null)
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

            await _repository.AddNew(review, cancellationToken, SaveToDb.Deferred);

            program.ProgramStatus = ProgramStatuses.Check;
            await _programRepository.Update(program, cancellationToken, SaveToDb.Deferred);


            ProgramHistory newHistory = new()
            {
                Id = Guid.NewGuid(),
                NewStatus = ProgramStatuses.Check,
                Program = program,
                SourceId = review.Id,
                SourceType = HistorySourceType.Check,
                UserId = review.AuditorId
            };

            await _historyRepository.AddNew(newHistory, cancellationToken, SaveToDb.Deferred);


            await _repository.SaveChanges(cancellationToken);

            return Result.Success<CreateOperationResponseDTO, ServiceError>(new(review.Id));
        }
    }
}
