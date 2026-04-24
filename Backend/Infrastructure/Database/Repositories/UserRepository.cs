using Application.Abstractions.Repositories;
using Domain.Entities.References;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories
{
    public class UserRepository(AppDBContext context) : BaseRepository<User>(context), IUserRepository
    {
        public async Task<User?> GetByLogin(string login, CancellationToken cancellationToken)
        {
            return await _context.Users.SingleOrDefaultAsync(i => i.Login == login, cancellationToken);
        }
    }
}
