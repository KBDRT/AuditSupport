using Application.Common;
using Application.DTO.Directions;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Definitions
{
    public interface IDirectionService
    {
        public Task<Result<Guid, ServiceError>> Create(CreateDirectionDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> Delete(Guid directionId, CancellationToken cancellationToken);

        public Task<Result<List<Direction>, ServiceError>> Get(CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> Update(UpdateDirectionDTO dto, CancellationToken cancellationToken);
    }
}
