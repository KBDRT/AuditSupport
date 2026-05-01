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

        public async Task<ProgramVersion?> GetWithProgram(Guid versionId, CancellationToken cancellationToken = default)
        {
            return await _context.ProgramVersions.Where(x => x.Id == versionId)
                                                 .Include(x => x.Program).ThenInclude(x => x.EduYear)
                                                 .Include(x => x.Program).ThenInclude(x => x.Teacher)
                                                 .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task SetUnuseForAll(Guid programId, CancellationToken cancellationToken = default)
        {
            await _context.ProgramVersions.ExecuteUpdateAsync(s => s.SetProperty(u => u.IsSuccessCheck, u => false), cancellationToken);
        }
    }
}
