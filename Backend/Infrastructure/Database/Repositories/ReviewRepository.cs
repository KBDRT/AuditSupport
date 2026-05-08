using Application.Abstractions.Repositories;
using Domain.Entities.ProgramContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories
{
    public class ReviewRepository(AppDBContext context) : BaseRepository<ProgramReview>(context), IReviewRepository
    {
        public async Task<ProgramReview?> GetByIdWithVersion(Guid reviewId, CancellationToken cancellationToken = default)
        {
            return await _dbSet.Where(x => x.Id == reviewId)
                               .Include(x => x.ProgramVersion)
                               .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<List<ProgramReview>> GetReviewsForProgram(Guid programId, CancellationToken cancellationToken = default)
        {
            return await _dbSet.Where(x => x.ProgramVersion.ProgramId == programId)
                               .Include(x => x.Auditor)
                               .ToListAsync(cancellationToken);
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
