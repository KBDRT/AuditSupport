using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;

namespace Application.Services.Definitions.FileCheckServices
{
    public interface IProgramFileChecksService
    {
        Task<Result<List<CheckError>, ServiceError>> CheckFile(Stream fileStream, CancellationToken cancellationToken);
    }
}
