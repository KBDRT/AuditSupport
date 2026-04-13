using CSharpFunctionalExtensions;

namespace Application.Services.Definitions
{
    public interface IAuthService
    {
        public Task<Result<string>> LoginUser(string login, string password, CancellationToken cancellationToken);


    }
}
