using Application.DTO.Rules;
using AutoMapper;
using Domain.Entities.Rules;

namespace Application.MappingProfiles
{
    public class RuleProfile : Profile
    {
        public RuleProfile()
        {
            CreateMap<RuleWord, GetWordRuleResponseDTO>()
                        .ForCtorParam("RuleId", opt => opt.MapFrom(src => src.Id))
                        .ForCtorParam("Word", opt => opt.MapFrom(src => src.Word))
                        .ForCtorParam("Commentary", opt => opt.MapFrom(src => src.Commentary));

            CreateMap<RuleSectionStructure, SectionStructureDTO>();

            CreateMap<RuleSection, GetSectionRuleResponseDTO>()
                      .ForCtorParam("RuleId", opt => opt.MapFrom(src => src.Id))
                      .ForCtorParam("SectionName", opt => opt.MapFrom(src => src.SectionName))
                      .ForCtorParam("Commentary", opt => opt.MapFrom(src => src.Commentary))
                      .ForCtorParam("Type", opt => opt.MapFrom(src => src.Type))
                      .ForCtorParam("Structure", opt => opt.MapFrom(src =>
                          src.Structure.Select(s => new SectionStructureDTO(
                              s.Name
                          )).ToList()
                      ));
        }
    }
}
