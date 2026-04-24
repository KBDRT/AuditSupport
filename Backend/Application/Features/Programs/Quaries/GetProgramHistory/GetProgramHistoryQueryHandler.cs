using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramHistory
{
    public class GetProgramHistoryQueryHandler : IRequestHandler<GetProgramHistoryQuery, Result<List<ProgramHistory>, ServiceError>>
    {
        private readonly IProgramHistoryRepository _repository;

        public GetProgramHistoryQueryHandler(IProgramHistoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result<List<ProgramHistory>, ServiceError>> Handle(GetProgramHistoryQuery request, CancellationToken cancellationToken)
        {
            var history = await _repository.GetByProgramId(request.ProgramId, cancellationToken);

            return Result.Success<List<ProgramHistory>, ServiceError>(history);
        }
    }
}
