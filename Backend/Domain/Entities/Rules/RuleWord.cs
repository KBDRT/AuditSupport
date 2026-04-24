using Domain.Entities.Base;

namespace Domain.Entities.Rules
{
    public class RuleWord : Identifier
    {
        public string Word { get; set; } = string.Empty;

        public string Commentary { get; set; } = string.Empty;
    }
}
