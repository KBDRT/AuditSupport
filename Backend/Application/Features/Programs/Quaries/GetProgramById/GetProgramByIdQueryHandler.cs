using Application.Abstractions.Repositories.Builders;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramById
{
    public class GetProgramByIdQueryHandler : IRequestHandler<GetProgramByIdQuery, Result<EduProgram, ServiceError>>
    {
        private readonly IProgramQueryBuilder _queryBuilder;

        public GetProgramByIdQueryHandler(IProgramQueryBuilder queryBuilder)
        {
            _queryBuilder = queryBuilder;
        }

        public async Task<Result<EduProgram, ServiceError>> Handle(GetProgramByIdQuery request, CancellationToken cancellationToken)
        {
            var program = await _queryBuilder.ForId(request.ProgramId)
                                             .SingleOrDefaultAsync(cancellationToken);

            if (program == null)
            {
                return Result.Failure<EduProgram, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            return Result.Success<EduProgram, ServiceError>(program);
        }
    }
}
