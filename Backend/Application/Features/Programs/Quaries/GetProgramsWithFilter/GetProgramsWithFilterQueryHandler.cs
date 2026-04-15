using Application.Abstractions.Repositories.Builders;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramsWithFilter
{
    public class GetProgramsWithFilterQueryHandler : IRequestHandler<GetProgramsWithFilterQuery, Result<List<EduProgram>, ServiceError>>
    {
        private readonly IProgramQueryBuilder _queryBuilder;

        public GetProgramsWithFilterQueryHandler(IProgramQueryBuilder queryBuilder)
        {
            _queryBuilder = queryBuilder;
        }

        public async Task<Result<List<EduProgram>, ServiceError>> Handle(GetProgramsWithFilterQuery request, CancellationToken cancellationToken)
        {
            var query = _queryBuilder.ForYear(request.YearId);

            if (request.Teachers != null) 
                query = query.ForTeachers(request.Teachers);

            if (request.Statuses != null)
                query = query.WithStatuses(request.Statuses);

            if (request.Directions != null)
                query = query.ForDirections(request.Directions);

            if (request.Pagination != null)
                query = query.UsePagination(request.Pagination);

            var programs = await query.ToListAsync(cancellationToken);

            return Result.Success<List<EduProgram>, ServiceError>(programs);
        }
    }
}
