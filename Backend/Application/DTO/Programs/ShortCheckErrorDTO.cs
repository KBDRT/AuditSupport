using Domain.Entities.ProgramContext;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTO.Programs
{
    public class ShortCheckErrorDTO
    {
        public Guid Id { get; set; }
        public Guid RuleSourceId { get; set; } 

        public RuleType RuleType { get; set; }

        public string Message { get; set; } = string.Empty; 

        public string Rule { get; set; } = string.Empty; 

        public int WordLength { get; set; } = 0;

        public string Context { get; set; } = string.Empty;

        public string SectionName { get; set; } = string.Empty;

        public int PageNumber { get; set; }
    }
}
