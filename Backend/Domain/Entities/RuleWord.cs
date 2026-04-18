using Domain.Entities.Base;

namespace Domain.Entities
{
    public class RuleWord : Identifier
    {
        public string Word { get; set; } = string.Empty;
    }
}
