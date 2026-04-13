using Application.Abstractions.Repositories;
using Application.Helpers;
using Application.Services.Definitions;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Implementations
{

    public class DirectionService : IDirectionService
    {
        private readonly IBaseRepository<Direction> _repository;
        private readonly ServiceResult _result;

        public DirectionService(IBaseRepository<Direction> directionRepository, ServiceResult result)
        {
            _repository = directionRepository;
            _result = result;
        }

        public async Task<Result<Guid>> Create(string name, string shortName, string description, CancellationToken cancellationToken)
        {
            if (String.IsNullOrWhiteSpace(name))
            {
                _result.AddMessage("Empty name");
                return Result.Failure<Guid>("Error");
            }

            Direction newDirection = new()
            {
                Name = name,
                Description = shortName,
                ShortName = shortName,
                Id = Guid.NewGuid(),
            };

            var newGuid = await _repository.AddNewAsync(newDirection, cancellationToken);
            return Result.Success(newGuid);
        }

        public async Task<Result> Delete(Guid directionId, CancellationToken cancellationToken)
        {
            if (directionId == Guid.Empty)
            {
                _result.AddMessage("Empty id");
                _result.SetStatusCode(400);
                return Result.Failure<Guid>("Error");
            }

            await _repository.DeleteByIdAsync(directionId, cancellationToken);
            return Result.Success();
        }

        public async Task<Result<List<Direction>>> Get(CancellationToken cancellationToken)
        {
            var directions = await _repository.GetAllAsync(cancellationToken) ?? [];

            return Result.Success(directions);
        }

        public async Task<Result> Update(Direction direction, CancellationToken cancellationToken)
        {
            await _repository.UpdateAsync(direction, cancellationToken);

            return Result.Success();
        }
    }
}
