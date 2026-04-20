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
            CreateMap<CreateRuleDTO, RuleSection>();

            CreateMap<RuleWord, GetRuleResponseDTO>();
            CreateMap<RuleSection, GetRuleResponseDTO>();

            CreateMap<UpdateRuleDTO, RuleWord>();
            CreateMap<UpdateRuleDTO, RuleSection>();
            //CreateMap<CreateUserDTO, User>()
            //.ForMember(dest => dest.Initials, opt => opt.MapFrom(src => new PersonInitials() { Name = src.Name, Surname = src.Surname, Patronymic = src.Patronymic }));
        }
    }
}



// CreateRuleDTO -> RuleWord RuleSection
// RuleWord RuleSection -> GetRuleResponseDTO 
// UpdateRuleDTO  -> RuleWord RuleSection