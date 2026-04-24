namespace Presentation.Contracts.Rule
{
    public record UpdateWordRuleRequest
    (
        Guid RuleId,
        string Word,
        string Commentary
    );
}
