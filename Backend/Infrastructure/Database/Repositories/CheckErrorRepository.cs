using Application.Abstractions.Repositories;
using Domain.Entities.ProgramContext;
using Domain.Entities.References;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Database.Repositories
{
    public class CheckErrorRepository(AppDBContext context) : BaseRepository<CheckError>(context), ICheckErrorRepository
    {

        public async Task<List<CheckError>> GetErrorsByCheckId(Guid checkId, CancellationToken cancellationToken = default)
        {
            return await _context.CheckErrors.Where(x => x.TechCheckId == checkId)
                                             .OrderBy(x => x.RuleType)
                                             .ToListAsync(cancellationToken);
        }
    }
}
