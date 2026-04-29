using Domain.Entities.ProgramContext;
using Domain.Enums;

namespace Application.DTO.Programs
{
    public class EduProgramDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string AgesOfChildrens { get; set; }
        public string Duration { get; set; }
        public string Year { get; set; }
        public string Direction { get; set; }
        public Guid DirectionId { get; set; }
        public string Teacher { get; set; }
        public ProgramStatuses ProgramStatus { get; set; }
        public List<ProgramVersionDTO> Versions { get; set; }
    };
}
