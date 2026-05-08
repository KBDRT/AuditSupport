using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Programs;
using AutoMapper;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramHistory
{
    public class GetProgramHistoryQueryHandler : IRequestHandler<GetProgramHistoryQuery, Result<List<ProgramHistoryDTO>, ServiceError>>
    {
        private readonly IProgramHistoryRepository _repository;
        private readonly IMapper _mapper;

        public GetProgramHistoryQueryHandler(IProgramHistoryRepository repository, 
                                            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Result<List<ProgramHistoryDTO>, ServiceError>> Handle(GetProgramHistoryQuery request, CancellationToken cancellationToken)
        {
            var history = await _repository.GetByProgramId(request.ProgramId, cancellationToken);

            var result = _mapper.Map<List<ProgramHistoryDTO>>(history);

            return Result.Success<List<ProgramHistoryDTO>, ServiceError>(result);
        }
    }
}
