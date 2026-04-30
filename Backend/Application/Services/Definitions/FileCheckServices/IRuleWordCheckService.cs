using Application.DTO.Programs;
using Domain.Entities.ProgramContext;

namespace Application.Services.Definitions.FileCheckServices
{
    public interface IRuleWordCheckService
    {
        Task<List<CheckError>> CheckProgramWords(ProgramFileStructure structure, CancellationToken cancellationToken);
    }
}

