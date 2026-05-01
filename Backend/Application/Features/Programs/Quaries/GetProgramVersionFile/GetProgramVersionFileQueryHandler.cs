using Application.Abstractions.Files;
using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Programs;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramVersionFile
{

    public class GetProgramVersionFileQueryHandler : IRequestHandler<GetProgramVersionFileQuery, Result<GetProgramFileResponseDTO, ServiceError>>
    {
        private readonly IMinioService _minioService;
        private readonly IProgramVersionRepository _repository;

        public GetProgramVersionFileQueryHandler(IMinioService minioService,
                                                 IProgramVersionRepository repository)
        {
            _minioService = minioService;
            _repository = repository;
        }

        public async Task<Result<GetProgramFileResponseDTO, ServiceError>> Handle(GetProgramVersionFileQuery request, CancellationToken cancellationToken)
        {
            var version = await _repository.GetWithProgram(request.Versionid);
            if (version == null)
            {
                return Result.Failure<GetProgramFileResponseDTO, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            var fileStream = await _minioService.GetFile(request.Versionid.ToString());
            var fileName = GetFileName(version);

            return Result.Success<GetProgramFileResponseDTO, ServiceError>(new(fileStream, fileName));
        }

        private string GetFileName(ProgramVersion version)
        {
            return $"{version.Program.Teacher.Initials.Short}, {version.Program.Name}, {version.Program.EduYear.Period}.docx";
        }
    }
}
