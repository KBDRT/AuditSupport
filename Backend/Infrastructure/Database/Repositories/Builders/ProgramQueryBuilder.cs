using Application.Abstractions.Repositories.Builders;
using Application.DTO.Common;
using Domain.Entities.ProgramContext;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories.Builders
{

    public class ProgramQueryBuilder : IProgramQueryBuilder
    {
        private readonly AppDBContext _context;

        private IQueryable<EduProgram> _query;

        public ProgramQueryBuilder(AppDBContext context)
        {
            _context = context;
            _query = _context.EduPrograms;
        }

        public IProgramQueryBuilder ForId(Guid programId)
        {
            _query = _query.Where(x => x.Id == programId);
            return this;
        }

        public IProgramQueryBuilder ForYear(Guid yearId)
        {
            _query = _query.Where(x => x.EduYearId == yearId);
            return this;
        }

        public IProgramQueryBuilder ForTeacher(Guid teacherid)
        {
            _query = _query.Where(x => x.TeacherId == teacherid);
            return this;
        }

        public IProgramQueryBuilder ForDirection(Guid directionId)
        {
            _query = _query.Where(x => x.DirectionId == directionId);
            return this;
        }

        public IProgramQueryBuilder WithStatus(ProgramStatuses status)
        {
            _query = _query.Where(x => x.ProgramStatus == status);
            return this;
        }

        public IProgramQueryBuilder ForTeachers(List<Guid> teacherIds)
        {
            _query = _query.Where(x => teacherIds.Contains(x.TeacherId));
            return this;
        }

        public IProgramQueryBuilder ForDirections(List<Guid> directionIds)
        {
            _query = _query.Where(x => directionIds.Contains((Guid)x.DirectionId));
            return this;
        }

        public IProgramQueryBuilder WithStatuses(List<ProgramStatuses> statuses)
        {
            _query = _query.Where(x => statuses.Contains(x.ProgramStatus));
            return this;
        }

        public IProgramQueryBuilder IncludeVersion()
        {
            _query = _query.Include(x => x.Versions);
            return this;
        }

        public IProgramQueryBuilder IncludeYear()
        {
            _query = _query.Include(x => x.EduYear);
            return this;
        }

        public IProgramQueryBuilder IncludeDirection()
        {
            _query = _query.Include(x => x.Direction);
            return this;
        }

        public IProgramQueryBuilder IncludeTeacher()
        {
            _query = _query.Include(x => x.Teacher);
            return this;
        }

        public IProgramQueryBuilder UsePagination(PaginationDTO pagination)
        {
            _query = _query.OrderBy(x => x.Id)
                           .Skip((pagination.Page - 1) * pagination.Size)
                           .Take(pagination.Size);
            return this;
        }

        public async Task<List<EduProgram>> ToListAsync(CancellationToken cancellationToken)
        {
            return await _query.ToListAsync(cancellationToken);
        }

        public async Task<EduProgram?> SingleOrDefaultAsync(CancellationToken cancellationToken)
        {
            return await _query.SingleOrDefaultAsync(cancellationToken);
        }


    }
}
