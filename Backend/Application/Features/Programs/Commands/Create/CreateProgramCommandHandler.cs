using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using Domain.Entities.References;
using Domain.Enums;
using MediatR;

namespace Application.Features.Programs.Commands.Create
{
    public class CreateProgramCommandHandler : IRequestHandler<CreateProgramCommand, Result<CreateOperationResponseDTO, ServiceError>>
    {
        private readonly IBaseRepository<EduProgram> _repository;
        private readonly IBaseRepository<ProgramHistory> _historyRepository;

        public CreateProgramCommandHandler(IBaseRepository<EduProgram> repository, IBaseRepository<ProgramHistory> historyRepository)
        {
            _repository = repository;
            _historyRepository = historyRepository;
        }

        public async Task<Result<CreateOperationResponseDTO, ServiceError>> Handle(CreateProgramCommand request, CancellationToken cancellationToken)
        {
            EduProgram program = new()
            {
                AgesOfChildrens = request.AgesOfChildrens,
                DirectionId = request.DirectionId,
                Duration = request.Duration,
                Id = Guid.NewGuid(),
                Name = request.Name,
                TeacherId = request.TeacherId,
                EduYearId = request.YearId,
            };

            await _repository.AddNew(program, cancellationToken, SaveToDb.Deferred);


            ProgramHistory newHistory = new()
            {
                Id = Guid.NewGuid(),
                NewStatus = ProgramStatuses.Created,
                Program = program,
                SourceId = program.Id,
                SourceType = HistorySourceType.Program,
                UserId = request.TeacherId
            };

            await _historyRepository.AddNew(newHistory, cancellationToken, SaveToDb.Deferred);

            await _repository.SaveChanges(cancellationToken);


            return Result.Success<CreateOperationResponseDTO, ServiceError>(new(program.Id));
        }
    }
}
