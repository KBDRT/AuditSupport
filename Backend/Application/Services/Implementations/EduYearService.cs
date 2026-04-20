using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using Application.DTO.Years;
using Application.Helpers;
using Application.Services.Definitions;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Implementations
{
    public class EduYearService : IEduYearService
    {
        private readonly IBaseRepository<EduYear> _repository;

        public EduYearService(IBaseRepository<EduYear> repository)
        {
            _repository = repository;
        }

        public async Task<UnitResult<ServiceError>> ChangeStatus(ChangeYearStatusDTO dto, CancellationToken cancellationToken)
        {
            var oldEduYear = await _repository.GetById(dto.YearId, cancellationToken);
            
            if (oldEduYear == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }
            
            oldEduYear?.IsOpened = dto.IsOpenYear;
            await _repository.Update(oldEduYear, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }

        public async Task<Result<CreateOperationResponseDTO, ServiceError>> Create(CreateYearDTO dto, CancellationToken cancellationToken)
        {
            if (dto.StartYear <= 2000)
            {
                //_result.AddMessage("Incorrect id");
                return Result.Failure<CreateOperationResponseDTO, ServiceError>(new(ErrorsCode.INCORRECT_PARAMETERS, ""));
            }

            EduYear newEduYear = new()
            {
                Id = Guid.NewGuid(),
                StartYear = dto.StartYear,
                EndYear = dto.StartYear + 1,
                Description = dto.Description,
            };

            var newGuid = await _repository.AddNew(newEduYear, cancellationToken);
            return Result.Success<CreateOperationResponseDTO, ServiceError>(new(newGuid));
        }

        public async Task<UnitResult<ServiceError>> Delete(Guid yearId, CancellationToken cancellationToken)
        {
            if (yearId == Guid.Empty)
            {
                //_result.AddMessage("Empty id");
                //_result.SetStatusCode(400);
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.INCORRECT_PARAMETERS, ""));
            }

            await _repository.DeleteById(yearId, cancellationToken);
            return UnitResult.Success<ServiceError>();
        }

        public async Task<Result<List<EduYear>, ServiceError>> Get(CancellationToken cancellationToken)
        {
            var directions = await _repository.GetAll(cancellationToken) ?? [];

            return Result.Success<List<EduYear>, ServiceError>(directions);
        }

        public async Task<UnitResult<ServiceError>> Update(UpdateYearDTO dto, CancellationToken cancellationToken)
        {
            var eduYear = await _repository.GetById(dto.YearId, cancellationToken);
            if (eduYear == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            eduYear.Description = dto.Description;
            eduYear.StartYear = dto.StartYear;
            eduYear.EndYear = dto.StartYear + 1;

            await _repository.Update(eduYear, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}
