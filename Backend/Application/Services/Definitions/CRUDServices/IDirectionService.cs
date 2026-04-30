using Application.Common;
using Application.DTO.Common;
using Application.DTO.Directions;
using CSharpFunctionalExtensions;
using Domain.Entities.References;

namespace Application.Services.Definitions.CRUDServices
{
    public interface IDirectionService
    {
        public Task<Result<CreateOperationResponseDTO, ServiceError>> Create(CreateDirectionDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> Delete(Guid directionId, CancellationToken cancellationToken);

        public Task<Result<List<Direction>, ServiceError>> Get(CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> Update(UpdateDirectionDTO dto, CancellationToken cancellationToken);
    }
}
