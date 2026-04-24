using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramVersion
{
    public class GetProgramVersionQueryHandler : IRequestHandler<GetProgramVersionQuery, Result<ProgramVersion, ServiceError>>
    {

        private readonly IBaseRepository<ProgramVersion> _repository;

        public GetProgramVersionQueryHandler(IBaseRepository<ProgramVersion> repository)
        {
            _repository = repository;
        }

        public async Task<Result<ProgramVersion, ServiceError>> Handle(GetProgramVersionQuery request, CancellationToken cancellationToken)
        {
            var version = await _repository.GetById(request.VersionId, cancellationToken);

            if (version == null)
            {
                return Result.Failure<ProgramVersion, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            return Result.Success<ProgramVersion, ServiceError>(version);
        }
    }
}
