using Domain.Entities.Base;
using Domain.Entities.References;

namespace Domain.Entities.ProgramContext
{
    public class ProgramReview : Identifier
    {
        public Guid VersionId { get; set; }
        public ProgramVersion ProgramVersion { get; set; } = null!;

        public Guid AuditorId { get; set; }
        public User Auditor { get; set; } = null!;

        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;

        public string Commentary { get; set; } = string.Empty;

        public bool IsFinished { get; set; } = false;

        public bool IsSuccess { get; set; } = false;

        public double FileSize { get; set; }

    }
}
