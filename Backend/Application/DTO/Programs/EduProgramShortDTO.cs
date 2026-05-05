using Domain.Entities;
using Domain.Enums;

namespace Application.DTO.Programs
{
    public class EduProgramShortDTO
    {
        public Guid Id { get; set; } 
        public string Name { get; set; } = string.Empty;    
        public string AgesOfChildrens { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Direction { get; set; } = string.Empty;
        public string Teacher { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public ProgramStatuses ProgramStatus { get; set; }
    };
}
