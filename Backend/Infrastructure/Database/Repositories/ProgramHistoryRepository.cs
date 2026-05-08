using Application.Abstractions.Repositories;
using Domain.Entities.ProgramContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories
{
    public class ProgramHistoryRepository(AppDBContext context) : BaseRepository<ProgramHistory>(context), IProgramHistoryRepository
    {
        public async Task<List<ProgramHistory>> GetByProgramId(Guid programId, CancellationToken cancellationToken = default)
        {
            return await _context.ProgramHistories.Where(x => x.ProgramId == programId)
                                                  .Include(x => x.User)
                                                  .OrderBy(x => x.Date)
                                                  .ToListAsync(cancellationToken); 
        }
    }
}
