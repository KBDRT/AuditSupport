using Domain.Entities.Base;

namespace Domain.Entities
{
    public class ProgramVersion : Identifier
    {
        public int Version { get; set; }

        public EduProgram Program { get; set; } = null!;

        public string Changes { get; set; } = string.Empty;

        public string FileName { get; set; } = string.Empty;

        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;

    }
}
