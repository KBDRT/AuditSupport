using Application.Abstractions.Repositories.Builders;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

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

        public IProgramQueryBuilder ForYear(Guid yearId)
        {
            _query = _query.Where(x => x.YearId == yearId);
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
            _query = _query.Where(x => directionIds.Contains(x.DirectionId));
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


        public async Task<List<EduProgram>> ExecuteAsync()
        {
            return await _query.ToListAsync();
        }

        public async Task<EduProgram?> SingleOrDefaultAsync()
        {
            return await _query.SingleOrDefaultAsync();
        }


    }
}
