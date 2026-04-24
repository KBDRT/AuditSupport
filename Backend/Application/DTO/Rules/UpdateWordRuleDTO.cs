namespace Application.DTO.Rules
{
    public record UpdateWordRuleDTO
    (
        Guid RuleId,
        string Word,
        string Commentary
    );
}
