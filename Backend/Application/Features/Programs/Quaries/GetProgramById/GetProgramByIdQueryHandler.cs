using Application.Abstractions.Repositories.Builders;
using Application.Common;
using Application.DTO.Programs;
using AutoMapper;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramById
{
    public class GetProgramByIdQueryHandler : IRequestHandler<GetProgramByIdQuery, Result<EduProgramDTO, ServiceError>>
    {
        private readonly IProgramQueryBuilder _queryBuilder;
        private readonly IMapper _mapper;

        public GetProgramByIdQueryHandler(IProgramQueryBuilder queryBuilder,
                                          IMapper mapper)
        {
            _queryBuilder = queryBuilder;
            _mapper = mapper;
        }

        public async Task<Result<EduProgramDTO, ServiceError>> Handle(GetProgramByIdQuery request, CancellationToken cancellationToken)
        {
            var program = await _queryBuilder.ForId(request.ProgramId)
                                             .IncludeYear()
                                             .IncludeVersion()
                                             .SingleOrDefaultAsync(cancellationToken);

            if (program == null)
            {
                return Result.Failure<EduProgramDTO, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            var result = _mapper.Map<EduProgramDTO>(program);

            return Result.Success<EduProgramDTO, ServiceError>(result);
        }
    }
}
