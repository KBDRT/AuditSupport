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
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.EduYear.Period))
                .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction != null ? src.Direction.Name : string.Empty))
                .ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher.Initials.Short));

            CreateMap<EduProgram, EduProgramDTO>()
                        .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.EduYear.Period))
                        .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction != null ? src.Direction.Name : string.Empty))
                        .ForMember(dest => dest.DirectionId, opt => opt.MapFrom(src => src.DirectionId))
                        .ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher.Initials.Short))
                        .ForMember(dest => dest.Versions, opt => opt.MapFrom(src => src.Versions));


            CreateMap<ProgramVersion, ProgramVersionDTO>()
                 .ForMember(dest => dest.IsSuccessCheck, opt => opt.MapFrom(src => src.IsSuccessCheck));

            CreateMap<CheckError, ShortCheckErrorDTO>();
        }
    }
}
