using Application.Abstractions.Files;
using Application.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramVersionFile
{

    public class GetProgramVersionFileQueryHandler : IRequestHandler<GetProgramVersionFileQuery, Result<Stream, ServiceError>>
    {
        private readonly IMinioService _minioService;

        public GetProgramVersionFileQueryHandler(IMinioService minioService)
        {
            _minioService = minioService;
        }

        public async Task<Result<Stream, ServiceError>> Handle(GetProgramVersionFileQuery request, CancellationToken cancellationToken)
        {
            var fileStream = await _minioService.GetFile(request.Versionid.ToString());

            return Result.Success<Stream, ServiceError>(fileStream);
        }
    }
}
