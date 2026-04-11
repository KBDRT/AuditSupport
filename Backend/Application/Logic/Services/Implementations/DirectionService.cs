using Application.Abstractions.Repositories;
using Application.Logic.Services.Definitions;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Logic.Services.Implementations
{
    public record Error(string Code, string Message, int StatusCode);

    internal class DirectionService : IDirectionService
    {
        private readonly IBaseRepository<Direction> _directionRepository;

        public DirectionService(IBaseRepository<Direction> directionRepository)
        {
            _directionRepository = directionRepository;
        }

        public async Task<Result<Guid>> Create(string name, string shortName, string description)
        {
            Direction newDirection = new()
            {
                Name = name,
                Description = shortName,
                ShortName = shortName,
                Id = Guid.NewGuid(),
            };

            var newGuid = await _directionRepository.AddNewAsync(newDirection);

            return Result.Success<Guid>(newGuid);
        }

        public Task Delete()
        {
            throw new NotImplementedException();
        }

        public Task Get()
        {
            throw new NotImplementedException();
        }

        public Task Update()
        {
            throw new NotImplementedException();
        }
    }
}
