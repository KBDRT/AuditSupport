using Domain.Entities.ProgramContext;
using Domain.Enums;

namespace Application.DTO.Programs
{
    public record EduProgramDTO
    (
        Guid Id,
        string Name,
        string AgesOfChildrens,
        string Duration,
        string Year,
        string Direction,
        Guid DirectionId,
        string Teacher,
        ProgramStatuses ProgramStatus,
        List<ProgramVersion> Versions
    );
}
