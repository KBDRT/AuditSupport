namespace Presentation.Contracts.Rule
{
    public record UpdateRuleRequest
    (
        Guid RuleId,
        string Word
    );
}
