using Application.Abstractions.Repositories;
using Domain.Entities.ProgramContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories
{
    public class ProgramVersionRepository(AppDBContext context) : BaseRepository<ProgramVersion>(context), IProgramVersionRepository
    {
        public async Task<int> GetLastVersion(Guid programId, CancellationToken cancellationToken = default)
        {
            return await _context.ProgramVersions.Where(x => x.ProgramId == programId).CountAsync(cancellationToken);
        }
    }
}
