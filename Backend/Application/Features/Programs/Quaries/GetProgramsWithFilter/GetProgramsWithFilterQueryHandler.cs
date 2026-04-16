using Application.Abstractions.Repositories.Builders;
using Application.Common;
using Application.DTO.Programs;
using AutoMapper;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramsWithFilter
{
    public class GetProgramsWithFilterQueryHandler : IRequestHandler<GetProgramsWithFilterQuery, Result<List<EduProgramShortDTO>, ServiceError>>
    {
        private readonly IProgramQueryBuilder _queryBuilder;
        private readonly IMapper _mapper;

        public GetProgramsWithFilterQueryHandler(IProgramQueryBuilder queryBuilder,
                                                 IMapper mapper)
        {
            _queryBuilder = queryBuilder;
            _mapper = mapper;
        }

        public async Task<Result<List<EduProgramShortDTO>, ServiceError>> Handle(GetProgramsWithFilterQuery request, CancellationToken cancellationToken)
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

            var result = _mapper.Map<List<EduProgramShortDTO>>(programs);

            return Result.Success<List<EduProgramShortDTO>, ServiceError>(result);
        }
    }
}
