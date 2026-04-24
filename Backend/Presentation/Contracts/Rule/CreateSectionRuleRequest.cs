using Application.DTO.Rules;
using Domain.Entities.Rules;
using Domain.Enums;

namespace Presentation.Contracts.Rule
{
    public record CreateSectionRuleRequest
    (
        string SectionName,
        string Commentary,
        RuleSectionType Type,
        List<SectionStructureDTO> Structure
    );
}
