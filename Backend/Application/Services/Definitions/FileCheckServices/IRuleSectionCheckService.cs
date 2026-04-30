using Application.DTO.Programs;
using Domain.Entities.ProgramContext;

namespace Application.Services.Definitions.FileCheckServices
{
    public interface IRuleSectionCheckService
    {
        Task<List<CheckError>> CheckProgramSections(ProgramFileStructure structure, CancellationToken cancellationToken);
    }
}
