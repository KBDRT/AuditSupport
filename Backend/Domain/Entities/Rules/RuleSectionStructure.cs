using Domain.Entities.Base;

namespace Domain.Entities.Rules
{
    public class RuleSectionStructure : Identifier
    {
        public string Name { get; set; } = string.Empty;

        public Guid SectionId { get; set; }
        public RuleSection Section { get; set; } = null!;

    }
}
