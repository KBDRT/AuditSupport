using Domain.Entities.Rules;
using Domain.Enums;

namespace Application.DTO.Rules
{
    public record UpdateSectionRuleDTO
    (
        Guid RuleId,
        string SectionName,
        string Commentary,
        RuleSectionType Type,
        List<SectionStructureDTO> Structure
    );
}
