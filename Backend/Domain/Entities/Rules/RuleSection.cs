using Domain.Entities.Base;
using Domain.Enums;
using System.Security;

namespace Domain.Entities.Rules
{
    public class RuleSection : Identifier
    {
        public string SectionName { get; set; } = string.Empty;

        public int SectionNumber { get; set; } = 0;

        public string Commentary { get; set; } = string.Empty;

        public RuleSectionType Type { get; set; }

        public List<RuleSectionStructure> Structure { get; set; } = [];

    }
}
