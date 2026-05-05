using Application.Abstractions.Repositories;
using Domain.Entities.ProgramContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories
{
    public class ReviewRepository(AppDBContext context) : BaseRepository<ProgramReview>(context), IReviewRepository
    {
        public async Task<List<ProgramReview>> GetReviewsForProgram(Guid programId, CancellationToken cancellationToken = default)
        {
            return await _dbSet.Where(x => x.ProgramVersion.ProgramId == programId).ToListAsync(cancellationToken);
        }

        public async Task<ProgramReview?> GetReviewWithInfo(Guid id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.Where(x => x.Id == id)
                               .Include(x => x.ProgramVersion)
                                .ThenInclude(x => x.TechnicalCheck)
                               .Include(x => x.ProgramVersion)
                                .ThenInclude(x => x.Program)
                                .ThenInclude(x => x.EduYear)
                               .Include(x => x.ProgramVersion)
                                .ThenInclude(x => x.Program)
                                .ThenInclude(x => x.Direction)
                               .Include(x => x.ProgramVersion)
                                .ThenInclude(x => x.Program)
                                .ThenInclude(x => x.Teacher)
                               .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
