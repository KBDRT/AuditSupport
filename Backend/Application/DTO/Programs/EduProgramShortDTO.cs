using Domain.Entities;
using Domain.Enums;

namespace Application.DTO.Programs
{
    public record EduProgramShortDTO
    (
        Guid Id,
        string Name,
        string AgesOfChildrens,
        string Duration,
        string Year,
        string Direction,
        string Teacher,
        ProgramStatuses ProgramStatus
    );
}
