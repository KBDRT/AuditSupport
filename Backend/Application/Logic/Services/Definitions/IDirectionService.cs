using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Logic.Services.Definitions
{
    public interface IDirectionService
    {
        public Task<Result<Guid>> Create(string name, string shortName, string description, CancellationToken cancellationToken);

        public Task<Result> Delete(Guid directionId, CancellationToken cancellationToken);

        public Task<Result<List<Direction>>> Get(CancellationToken cancellationToken);

        public Task<Result> Update(Direction direction, CancellationToken cancellationToken);
    }
}
