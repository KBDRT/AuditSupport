
using Domain.Entities;

namespace Application.Abstractions.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User?> GetByLogin(string login, CancellationToken cancellationToken = default);
    }
}
