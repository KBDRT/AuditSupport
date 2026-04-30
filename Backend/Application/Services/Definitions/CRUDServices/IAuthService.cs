using Application.Common;
using Application.DTO.Users;
using CSharpFunctionalExtensions;

namespace Application.Services.Definitions.CRUDServices
{
    public interface IAuthService
    {
        public Task<Result<LoginUserResponseDTO, ServiceError>> LoginUser(LoginUserDTO dto, CancellationToken cancellationToken);
    }
}
