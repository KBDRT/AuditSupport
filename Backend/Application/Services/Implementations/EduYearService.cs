using Application.Abstractions.Repositories;
using Application.Helpers;
using Application.Services.Definitions;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Implementations
{
    public class EduYearService : IEduYearService
    {
        private readonly IBaseRepository<EduYear> _repository;
        private readonly ServiceResult _result;

        public EduYearService(IBaseRepository<EduYear> repository, ServiceResult result)
        {
            _repository = repository;
            _result = result;
        }


        public async Task<Result> ChangeStatus(Guid yearId, bool isOpenYear, CancellationToken cancellationToken)
        {
            var oldEduYear = await _repository.GetByIdAsync(yearId, cancellationToken);
            
            if (oldEduYear == null)
            {
                return Result.Failure("Not found");
            }
            
            oldEduYear?.IsOpened = isOpenYear;
            await _repository.UpdateAsync(oldEduYear, cancellationToken);

            return Result.Success();
        }

        public async Task<Result<Guid>> Create(int startYear, string description, CancellationToken cancellationToken)
        {
            if (startYear <= 2000)
            {
                _result.AddMessage("Incorrect id");
                return Result.Failure<Guid>("Error");
            }

            EduYear newEduYear = new()
            {
                Id = Guid.NewGuid(),
                StartYear = startYear,
                EndYear = startYear + 1,
                Description = description,
            };

            var newGuid = await _repository.AddNewAsync(newEduYear, cancellationToken);
            return Result.Success(newGuid);
        }

        public async Task<Result> Delete(Guid yearId, CancellationToken cancellationToken)
        {
            if (yearId == Guid.Empty)
            {
                _result.AddMessage("Empty id");
                _result.SetStatusCode(400);
                return Result.Failure<Guid>("Error");
            }

            await _repository.DeleteByIdAsync(yearId, cancellationToken);
            return Result.Success();
        }

        public async Task<Result<List<EduYear>>> Get(CancellationToken cancellationToken)
        {
            var directions = await _repository.GetAllAsync(cancellationToken) ?? [];

            return Result.Success(directions);
        }

        public async Task<Result> Update(EduYear year, CancellationToken cancellationToken)
        {
            await _repository.UpdateAsync(year, cancellationToken);

            return Result.Success();
        }
    }
}
