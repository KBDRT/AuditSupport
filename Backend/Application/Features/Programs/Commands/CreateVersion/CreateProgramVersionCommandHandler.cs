using Application.Abstractions.Files;
using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Commands.CreateVersion
{
    public class CreateProgramVersionCommandHandler : IRequestHandler<CreateProgramVersionCommand, Result<Guid, ServiceError>>
    {
        private readonly IProgramVersionRepository _repository;
        private readonly IMinioService _minioService;

        public CreateProgramVersionCommandHandler(IProgramVersionRepository repository, IMinioService minioService)
        {
            _repository = repository;
            _minioService = minioService;
        }

        public async Task<Result<Guid, ServiceError>> Handle(CreateProgramVersionCommand request, CancellationToken cancellationToken)
        {
            var lastVersion = await _repository.GetLastVersion(request.ProgramId, cancellationToken);

            ProgramVersion newVersion = new()
            {
                Id = Guid.NewGuid(),
                Changes = request.Changes,
                ProgramId = request.ProgramId,
                Version = ++lastVersion
            };


            await _minioService.PutFile(request.File, "test");


            await _repository.AddNew(newVersion, cancellationToken);

            return Result.Success<Guid, ServiceError>(newVersion.Id);

        }
    }
}
