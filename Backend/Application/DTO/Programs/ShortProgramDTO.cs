
using Domain.Enums;

namespace Application.DTO.Programs
{
    public record ShortProgramDTO
    (
        Guid Id,
        string Name,
        ProgramStatuses Status
    );
}
