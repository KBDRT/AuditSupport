using Domain.Entities.Base;
using Domain.Enums;

namespace Domain.Entities
{
    public class CheckError : Identifier
    {
        public Guid RuleSourceId { get; set; } // id правила

        public RuleType RuleType { get; set; } // тип правила

        public string Message { get; set; } = string.Empty; // сообщение

        public string Rule { get; set; } = string.Empty; // слово правила

        public string Description { get; set; } = string.Empty; // описание

    }
}
