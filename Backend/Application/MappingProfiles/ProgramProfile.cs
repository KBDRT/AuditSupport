using Application.DTO.Programs;
using Application.DTO.Users;
using AutoMapper;
using Domain.Entities.ProgramContext;
using Domain.Values;

namespace Application.MappingProfiles
{
    public class ProgramProfile : Profile
    {

        public ProgramProfile()
        {
            CreateMap<EduProgram, EduProgramShortDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.AgesOfChildrens, opt => opt.MapFrom(src => src.AgesOfChildrens))
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year.Period)) 
                .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction.Name)) 
                .ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher.Initials.Short)) 
                .ForMember(dest => dest.ProgramStatus, opt => opt.MapFrom(src => src.ProgramStatus));

            CreateMap<EduProgram, EduProgramDTO>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
               .ForMember(dest => dest.AgesOfChildrens, opt => opt.MapFrom(src => src.AgesOfChildrens))
               .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration))
               .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year.Period))
               .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction.Name))
               .ForMember(dest => dest.DirectionId, opt => opt.MapFrom(src => src.Direction.Id))
               .ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher.Initials.Short))
               .ForMember(dest => dest.ProgramStatus, opt => opt.MapFrom(src => src.ProgramStatus))
               .ForMember(dest => dest.Versions, opt => opt.MapFrom(src => src.Versions));
        }
    }
}
