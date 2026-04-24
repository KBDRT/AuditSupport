using Domain.Entities.Rules;
using Domain.Enums;

namespace Application.DTO.Rules
{
    public record CreateSectionRuleDTO
    (
        string SectionName,
        string Commentary,
        RuleSectionType Type,
        List<SectionStructureDTO> Structure
    );
}
