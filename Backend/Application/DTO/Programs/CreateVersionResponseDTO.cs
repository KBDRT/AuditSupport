using Domain.Entities.ProgramContext;

namespace Application.DTO.Programs
{
    public record CreateVersionResponseDTO
    (
        Guid Id,
        Guid TechCheckId,
        bool IsSuccessCheck
    );
}