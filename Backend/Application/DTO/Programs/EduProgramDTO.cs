using Domain.Entities.ProgramContext;
using Domain.Enums;

namespace Application.DTO.Programs
{
    public record EduProgramDTO
    (
        Guid Id,
        string Name,
        string AgesOfChildrens,
        double Duration,
        string Year,
        string Direction,
        string Teacher,
        ProgramStatuses ProgramStatus,
        List<ProgramVersion> Versions
    );
}
