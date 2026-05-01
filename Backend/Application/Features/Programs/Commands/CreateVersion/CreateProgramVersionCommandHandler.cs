using Application.Abstractions.Files;
using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using Application.DTO.Programs;
using Application.Services.Definitions.FileCheckServices;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Application.Features.Programs.Commands.CreateVersion
{
    public class CreateProgramVersionCommandHandler : IRequestHandler<CreateProgramVersionCommand, Result<CreateVersionResponseDTO, ServiceError>>
    {
        private readonly IProgramVersionRepository _repository;
        private readonly IMinioService _minioService;
        private readonly IProgramFileChecksService _checkService;
        private readonly IBaseRepository<TechCheck> _techRepository;

        public CreateProgramVersionCommandHandler(IProgramVersionRepository repository, 
                                                  IMinioService minioService,
                                                  IProgramFileChecksService checkService,
                                                  IBaseRepository<TechCheck> techRepository)
        {
            _repository = repository;
            _minioService = minioService;
            _checkService = checkService;
            _techRepository = techRepository;
        }

        public async Task<Result<CreateVersionResponseDTO, ServiceError>> Handle(CreateProgramVersionCommand request, CancellationToken cancellationToken)
        {
            var lastVersion = await _repository.GetLastVersion(request.ProgramId, cancellationToken);

            ProgramVersion newVersion = new()
            {
                Id = Guid.NewGuid(),
                Changes = request.Changes,
                ProgramId = request.ProgramId,
                Version = ++lastVersion
            };

            var checksResult = await _checkService.CheckFile(request.File, cancellationToken);

            TechCheck newCheck = new()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTimeOffset.UtcNow,
                Errors = checksResult.Value,
                VersionId = newVersion.Id,
                ProgramVersion = newVersion,
                IsSuccess = checksResult.Value.Count == 0
            };

            newVersion.IsSuccessCheck = newCheck.IsSuccess;

            await _repository.AddNew(newVersion);
            await _techRepository.AddNew(newCheck);

            await _minioService.PutFile(request.File, newVersion.Id.ToString());

            return Result.Success<CreateVersionResponseDTO, ServiceError>(new(newVersion.Id, newCheck.Id, newVersion.IsSuccessCheck));

        }
    }
}
