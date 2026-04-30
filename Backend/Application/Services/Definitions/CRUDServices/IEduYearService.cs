using Application.Common;
using Application.DTO.Common;
using Application.DTO.Years;
using CSharpFunctionalExtensions;
using Domain.Entities.References;

namespace Application.Services.Definitions.CRUDServices
{
    public interface IEduYearService
    {
        public Task<Result<CreateOperationResponseDTO, ServiceError>> Create(CreateYearDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> Delete(Guid yearId, CancellationToken cancellationToken);

        public Task<Result<List<EduYear>, ServiceError>> Get(CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> Update(UpdateYearDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> ChangeStatus(ChangeYearStatusDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> NotificateUsers(Guid yearId, CancellationToken cancellationToken);

    }
}
