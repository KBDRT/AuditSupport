using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Directions;
using Application.Helpers;
using Application.Services.Definitions;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Implementations
{

    public class DirectionService : IDirectionService
    {
        private readonly IBaseRepository<Direction> _repository;

        public DirectionService(IBaseRepository<Direction> directionRepository)
        {
            _repository = directionRepository;
        }

        public async Task<Result<Guid, ServiceError>> Create(CreateDirectionDTO dto, CancellationToken cancellationToken)
        {
            if (String.IsNullOrWhiteSpace(dto.Name))
            {
                //_result.AddMessage("Empty name");
                return Result.Failure<Guid, ServiceError>(new(ErrorsCode.INCORRECT_PARAMETERS, ""));
            }

            Direction newDirection = new()
            {
                Name = dto.Name,
                Description = dto.ShortName,
                ShortName = dto.ShortName,
                Id = Guid.NewGuid(),
            };

            var newGuid = await _repository.AddNew(newDirection, cancellationToken);
            return Result.Success<Guid, ServiceError>(newGuid);
        }

        public async Task<UnitResult<ServiceError>> Delete(Guid directionId, CancellationToken cancellationToken)
        {
            if (directionId == Guid.Empty)
            {
                //_result.AddMessage("Empty id");
                //_result.SetStatusCode(400);
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.INCORRECT_PARAMETERS, ""));
            }

            await _repository.DeleteById(directionId, cancellationToken);
            return UnitResult.Success<ServiceError>();
        }

        public async Task<Result<List<Direction>, ServiceError>> Get(CancellationToken cancellationToken)
        {
            var directions = await _repository.GetAll(cancellationToken) ?? [];

            return Result.Success<List<Direction>, ServiceError>(directions);
        }

        public async Task<UnitResult<ServiceError>> Update(UpdateDirectionDTO dto, CancellationToken cancellationToken)
        {
            var direction = await _repository.GetById(dto.DirectionId, cancellationToken);
            if (direction == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            direction.Description = dto.Description; 
            direction.ShortName = dto.ShortName;
            direction.Name = dto.Name;

            await _repository.Update(direction, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}
