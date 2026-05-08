using Domain.Entities.ProgramContext;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Abstractions.Repositories
{
    public interface IReviewRepository : IBaseRepository<ProgramReview>
    {

        Task<ProgramReview?> GetByIdWithVersion(Guid programId, CancellationToken cancellationToken = default);

        Task<List<ProgramReview>> GetReviewsForProgram(Guid programId, CancellationToken cancellationToken = default);

        Task<ProgramReview?> GetReviewWithInfo(Guid id, CancellationToken cancellationToken = default);
    }
}
