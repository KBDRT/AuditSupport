using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Definitions
{
    public interface IProgramReviewService
    {
        public Task<Result<Guid, ServiceError>> Create(Guid versionId, Guid auditorId, string commentary, bool isSuccess, Stream file, CancellationToken cancellationToken);

        public Task<Result> Delete(Guid checkId, CancellationToken cancellationToken);

        public Task<Result> Update(ProgramReview check, CancellationToken cancellationToken);

    }
}
