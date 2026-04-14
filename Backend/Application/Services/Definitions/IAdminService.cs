using Application.DTO;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application.Services.Definitions
{
    public interface IAdminService
    {
        public Task<Result> CreateUser(CreateUserDTO userInfo, CancellationToken cancellationToken);

        public Task<Result> DeleteUser(Guid userId, CancellationToken cancellationToken);

        public Task<Result> ChangeUserActivation(Guid userId, bool isActive, CancellationToken cancellationToken);

        public Task<Result<string>> ResetPassword(Guid userId, CancellationToken cancellationToken);

        public Task<Result<List<GetUserDTO>>> GetUsers(int page, int size, CancellationToken cancellationToken);


        public Task<Result> ChangeEmail(Guid userId, string newEmail, CancellationToken cancellationToken);


    }
}
