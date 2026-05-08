using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using Domain.Enums;
using MediatR;

namespace Application.Features.Programs.Commands.ChangeStatus
{
    public class ChangeProgramStatusCommandHandler : IRequestHandler<ChangeProgramStatusCommand, UnitResult<ServiceError>>
    {
        private readonly IBaseRepository<EduProgram> _programRepository;
        private readonly IProgramVersionRepository _versionRepository;
        private readonly IBaseRepository<ProgramHistory> _historyRepository;

        public ChangeProgramStatusCommandHandler(IBaseRepository<EduProgram> programRepository, 
                                                 IProgramVersionRepository versionRepository,
                                                 IBaseRepository<ProgramHistory> historyRepository)
        {
            _programRepository = programRepository;
            _versionRepository = versionRepository;
            _historyRepository = historyRepository;
        }

        public async Task<UnitResult<ServiceError>> Handle(ChangeProgramStatusCommand request, CancellationToken cancellationToken)
        {
            var program = await _programRepository.GetById(request.ProgramId, cancellationToken);
            if (program == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, "Не найден"));
            }

            if (program.ProgramStatus != request.NewStatus)
            {
                program.ProgramStatus = request.NewStatus;
                await _programRepository.Update(program, cancellationToken, SaveToDb.Deferred);

                if (request.NewStatus == ProgramStatuses.ReadyToCheck)
                {
                    if (request.VersionId != null)
                    {
                        await _versionRepository.SetUnuseForAll(request.ProgramId, cancellationToken);

                        var version = await _versionRepository.GetById((Guid)request.VersionId, cancellationToken);
                        if (version != null)
                        {
                            version.IsUseForReview = true;
                            await _versionRepository.Update(version, cancellationToken, SaveToDb.Deferred);
                        }
                    }
                }

                ProgramHistory newHistory = new()
                {
                    Id = Guid.NewGuid(),
                    NewStatus = program.ProgramStatus,
                    Program = program,
                    SourceId = program.Id,
                    SourceType = HistorySourceType.Program,
                    UserId = program.TeacherId
                };

                await _historyRepository.AddNew(newHistory, cancellationToken, SaveToDb.Deferred);


                await _programRepository.SaveChanges(cancellationToken);
            }

            return Result.Success<ServiceError>();
        }
    }
}
