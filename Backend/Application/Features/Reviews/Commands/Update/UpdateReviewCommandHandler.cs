using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using Domain.Enums;
using MediatR;

namespace Application.Features.Reviews.Commands.Update
{
    public class UpdateReviewCommandHandler : IRequestHandler<UpdateReviewCommand, UnitResult<ServiceError>>
    {

        private readonly IReviewRepository _repository;
        private readonly IBaseRepository<EduProgram> _programRepository;
        private readonly IBaseRepository<ProgramHistory> _historyRepository;

        public UpdateReviewCommandHandler(IReviewRepository repository, 
                                          IBaseRepository<EduProgram> programRepository,
                                          IBaseRepository<ProgramHistory> historyRepository)
        {
            _repository = repository;
            _programRepository = programRepository;
            _historyRepository = historyRepository;
        }

        public async Task<UnitResult<ServiceError>> Handle(UpdateReviewCommand request, CancellationToken cancellationToken)
        {
            var review = await _repository.GetByIdWithVersion(request.ReviewId, cancellationToken);
            if (review == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            review.Commentary = request.Commentary;
            review.IsSuccess = request.IsSuccess;
            review.IsFinished = request.IsFinished;


            await _repository.Update(review, cancellationToken, SaveToDb.Deferred);

            var program = await _programRepository.GetById(review.ProgramVersion.ProgramId, cancellationToken);

            if (program == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            if (review.IsFinished)
            {
                program.ProgramStatus = review.IsSuccess ? ProgramStatuses.ReadyToApprove : ProgramStatuses.NeedChanges;
                await _programRepository.Update(program, cancellationToken, SaveToDb.Deferred);
            }

            ProgramHistory newHistory = new()
            {
                Id = Guid.NewGuid(),
                NewStatus = program.ProgramStatus,
                Program = program,
                SourceId = review.Id,
                SourceType = HistorySourceType.Check,
                UserId = review.AuditorId
            };

            await _historyRepository.AddNew(newHistory, cancellationToken, SaveToDb.Deferred);

            await _repository.SaveChanges(cancellationToken);
          
            // change file

            return Result.Success<ServiceError>();
        }
    }
}
