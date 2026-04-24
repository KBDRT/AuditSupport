using Domain.Entities.Base;
using Domain.Entities.References;
using Domain.Enums;

namespace Domain.Entities.ProgramContext
{
    public class ProgramHistory : Identifier
    {
        public Guid UserId { get; set; }

        public User User { get; set; }  

        public Guid ProgramId { get; set; }

        public EduProgram Program { get; set; }

        public DateTimeOffset Date { get; set; } = DateTimeOffset.UtcNow;

        public ProgramStatuses OldStatus { get; set; }

        public ProgramStatuses NewStatus { get; set; }

        public Guid SourceId { get; set; }

        public HistorySourceType SourceType { get; set; }

    }
}
