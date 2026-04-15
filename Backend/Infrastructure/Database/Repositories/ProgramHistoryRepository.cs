using Application.Abstractions.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Database.Repositories
{
    public class ProgramHistoryRepository(AppDBContext context) : BaseRepository<ProgramHistory>(context), IProgramHistoryRepository
    {
        public async Task<List<ProgramHistory>> GetByProgramId(Guid programId, CancellationToken cancellationToken = default)
        {
            await _context.ProgramHistories.Where(x => x.ProgramId == programId).ToListAsync(cancellationToken); 
        }
    }
}
