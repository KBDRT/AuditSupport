namespace Application.DTO.Rules
{
    public record GetWordRuleResponseDTO
    (
        Guid RuleId,
        string Word,
        string Commentary
    );
}
