using Domain.Entities.Base;

namespace Domain.Entities.ProgramContext
{
    public class ProgramVersion : Identifier
    {
        public int Version { get; set; } = 0;

        public Guid ProgramId {  get; set; }

        public EduProgram Program { get; set; } = null!;

        public string Changes { get; set; } = string.Empty;

        public double FileSize { get; set; }

        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;

        public Guid? TechCheckId { get; set; }

        public TechCheck? TechnicalCheck { get; set; }

    }
}
