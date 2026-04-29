using Domain.Entities.ProgramContext;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTO.Programs
{
    public class ProgramVersionDTO
    {
        public Guid Id { get; set; }
        public string Changes { get; set; }
        public double FileSize { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    };
}


//public int Version { get; set; } = 0;

//public Guid ProgramId { get; set; }

//public EduProgram Program { get; set; } = null!;

//public string Changes { get; set; } = string.Empty;

//public double FileSize { get; set; }

//public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;

//public Guid TechCheckId { get; set; }

//public TechCheck TechnicalCheck { get; set; } = null!;