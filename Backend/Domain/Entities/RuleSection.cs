using Domain.Entities.Base;

namespace Domain.Entities
{
    public class RuleSection : Identifier
    {
        public string SectionName { get; set; } = string.Empty;

        public int SectionNumber { get; set; } = 0;
    }
}
