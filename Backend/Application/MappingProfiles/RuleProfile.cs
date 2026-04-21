using Application.DTO.Rules;
using Application.DTO.Users;
using AutoMapper;
using Domain.Entities;
using Domain.Values;

namespace Application.MappingProfiles
{
    public class RuleProfile : Profile
    {
        public RuleProfile()
        {
            CreateMap<CreateRuleDTO, RuleWord>();
            CreateMap<CreateRuleDTO, RuleSection>()
                .ForMember(dest => dest.SectionName, opt => opt.MapFrom(src => src.Word));

            CreateMap<RuleWord, GetRuleResponseDTO>().ConstructUsing(src => new GetRuleResponseDTO(src.Id, src.Word));

            CreateMap<RuleSection, GetRuleResponseDTO>().ConstructUsing(src => new GetRuleResponseDTO(src.Id, src.SectionName));

            CreateMap<UpdateRuleDTO, RuleWord>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RuleId));
            CreateMap<UpdateRuleDTO, RuleSection>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RuleId))
                .ForMember(dest => dest.SectionName, opt => opt.MapFrom(src => src.Word));
        }
    }
}
