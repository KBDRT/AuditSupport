using Application.Common;
using Application.DTO.Common;
using Application.DTO.Users;
using CSharpFunctionalExtensions;

namespace Application.Services.Definitions
{
    public interface IAdminService
    {
        public Task<Result<CreateUserResponseDTO, ServiceError>> CreateUser(CreateUserDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> DeleteUser(Guid userId, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> ChangeUserActivation(ChangeUserActivationDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> ResetPassword(Guid userId, CancellationToken cancellationToken);

        public Task<Result<List<GetUserDTO>, ServiceError>> GetUsers(PaginationDTO pagination, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> ChangeEmail(ChangeUserEmailDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> UpdateUser(UpdateUserDTO dto, CancellationToken cancellationToken);
    }
}
