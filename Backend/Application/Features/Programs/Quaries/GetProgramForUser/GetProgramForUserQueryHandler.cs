using Application.Abstractions.Repositories.Builders;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramForUser
{
    public class GetProgramForUserQueryHandler : IRequestHandler<GetProgramForUserQuery, Result<EduProgram, ServiceError>>
    {
        private readonly IProgramQueryBuilder _queryBuilder;

        public GetProgramForUserQueryHandler(IProgramQueryBuilder queryBuilder)
        {
            _queryBuilder = queryBuilder;
        }

        public async Task<Result<EduProgram, ServiceError>> Handle(GetProgramForUserQuery request, CancellationToken cancellationToken)
        {
            var program = await _queryBuilder.ForYear(request.YearId)
                                             .ForTeacher(request.TeacherId)
                                             .SingleOrDefaultAsync(cancellationToken);

            if (program == null)
            {
                return Result.Failure<EduProgram, ServiceError>(new(ErrorsCode.NOT_FOUND, "Программа не найдена"));
            }

            return Result.Success<EduProgram, ServiceError>(program);
        }
    }
}
