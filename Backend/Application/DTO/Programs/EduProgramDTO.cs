using Domain.Entities.ProgramContext;
using Domain.Enums;

namespace Application.DTO.Programs
{
    public class EduProgramDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string AgesOfChildrens { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Direction { get; set; } = string.Empty;
        public Guid DirectionId { get; set; }
        public string Teacher { get; set; } = string.Empty;
        public ProgramStatuses ProgramStatus { get; set; }
        public List<ProgramVersionDTO> Versions { get; set; } = [];
    };
}
