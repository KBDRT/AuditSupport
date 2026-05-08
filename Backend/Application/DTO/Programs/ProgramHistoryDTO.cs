using Domain.Entities.ProgramContext;
using Domain.Entities.References;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTO.Programs
{
    public class ProgramHistoryDTO
    {
        public Guid UserId { get; set; }
        public string UserFIO { get; set; }
        public Guid ProgramId { get; set; }
        public DateTimeOffset Date { get; set; }
        public ProgramStatuses OldStatus { get; set; }
        public ProgramStatuses NewStatus { get; set; }
        public Guid SourceId { get; set; }
        public HistorySourceType SourceType { get; set; }
    };
}
