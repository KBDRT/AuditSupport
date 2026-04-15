using Application.Abstractions.Repositories;
using Application.Common;
using Application.Services.Definitions;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Implementations
{
    public class ProgramReviewService : IProgramReviewService
    {
        private readonly IBaseRepository<ProgramReview> _repository;

        public ProgramReviewService(IBaseRepository<ProgramReview> repository)
        {
            _repository = repository;
        }


        public async Task<Result<Guid, ServiceError>> Create(Guid versionId, Guid auditorId, string commentary, bool isSuccess, Stream file, CancellationToken cancellationToken)
        {
            ProgramReview programReview = new()
            {
                Id = Guid.NewGuid(),
                AuditorId = auditorId,
                Commentary = commentary,
                IsSuccess = isSuccess,
                VersionId = versionId
            };

            await _repository.AddNew(programReview);

            return Result.Success<Guid, ServiceError>(programReview.Id);
        }

        public async Task<Result> Delete(Guid checkId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Result> Update(ProgramReview check, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
