using Application.DTO;
using CSharpFunctionalExtensions;

namespace Application.Services.Definitions
{
    public interface IAdminService
    {
        public Task<Result> CreateUser(CreateUserDTO userInfo, CancellationToken cancellationToken);

        public Task DeleteUser();

        public Task DeactivateUser();
        
    }
}
