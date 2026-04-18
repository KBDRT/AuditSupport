using Domain.Entities.Base;

namespace Domain.Entities
{
    public class TechCheck : Identifier
    {
        public Guid VersionId { get; set; }
        public ProgramVersion ProgramVersion { get; set; } = null!;

        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;

        public bool IsSuccess { get; set; } = false;

        public List<CheckError> Errors { get; set; } = [];

    }
}
