using Domain.Entities.Base;
using Domain.Enums;

namespace Domain.Entities.ProgramContext
{
    public class CheckError : Identifier
    {
        public Guid RuleSourceId { get; set; } // id правила

        public RuleType RuleType { get; set; } // тип правила

        public string Message { get; set; } = string.Empty; // сообщение

        public string Rule { get; set; } = string.Empty; // слово правила

        public int WordLength { get; set; } = 0;

        public string Context { get; set; } = string.Empty; // описание

        public Guid TechCheckId { get; set; }
        public TechCheck TechCheck { get; set; } = null!;

        public string SectionName { get; set; } = string.Empty;

        public int PageNumber { get; set; }

    }
}
