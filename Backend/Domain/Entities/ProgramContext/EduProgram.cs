using Domain.Entities.Base;
using Domain.Entities.References;
using Domain.Enums;

namespace Domain.Entities.ProgramContext
{
    public class EduProgram : Identifier
    {
        public string Name { get; set; } = string.Empty;

        public string AgesOfChildrens { get; set; } = string.Empty;
        
        public double Duration { get; set; }

        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;

        public Guid YearId { get; set; }
        public EduYear Year { get; set; } = null!;

        public Guid DirectionId { get; set; }
        public Direction Direction { get; set; } = null!;

        public Guid TeacherId { get; set; }
        public User Teacher { get; set; } = null!;

        public ProgramStatuses ProgramStatus { get; set; }

        public List<ProgramVersion> Versions { get; set; } = [];
    }
}
