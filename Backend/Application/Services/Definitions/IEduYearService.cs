using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Definitions
{
    public interface IEduYearService
    {
        public Task<Result<Guid>> Create(int startYear, string description, CancellationToken cancellationToken);

        public Task<Result> Delete(Guid yearId, CancellationToken cancellationToken);

        public Task<Result<List<EduYear>>> Get(CancellationToken cancellationToken);

        public Task<Result> Update(EduYear year, CancellationToken cancellationToken);

        public Task<Result> ChangeStatus(Guid yearId, bool isOpenYear, CancellationToken cancellationToken);
    }
}
