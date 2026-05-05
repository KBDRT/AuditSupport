using Application.DTO.Programs;
using Application.DTO.Reviews;
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
                .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction.Name))
                .ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher.Initials.Full))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Teacher.Email));

            CreateMap<EduProgram, EduProgramDTO>()
                        .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.EduYear.Period))
                        .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction != null ? src.Direction.Name : string.Empty))
                        .ForMember(dest => dest.DirectionId, opt => opt.MapFrom(src => src.DirectionId))
                        .ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher.Initials.Short))
                        .ForMember(dest => dest.Versions, opt => opt.MapFrom(src => src.Versions));


            CreateMap<ProgramVersion, ProgramVersionDTO>()
                 .ForMember(dest => dest.IsSuccessCheck, opt => opt.MapFrom(src => src.IsSuccessCheck));

            CreateMap<CheckError, ShortCheckErrorDTO>();

            CreateMap<ProgramReview, ShortReviewResponseDTO>()
                .ForMember(dest => dest.Auditor, opt => opt.MapFrom(src => src.Auditor.Initials.Short));

            CreateMap<ProgramReview, GetReviewResponseDTO>()
               .ForMember(dest => dest.ProgramVersion, opt => opt.MapFrom(src => src.ProgramVersion))
               .ForMember(dest => dest.Program, opt => opt.MapFrom(src => src.ProgramVersion.Program));
        }
    }
}


//public Guid Id { get; set; }
//public string Commentary { get; set; } = string.Empty;
//public ProgramVersionDTO? ProgramVersion { get; set; }
//public bool IsFinished { get; set; } = false;
//public bool IsSuccess { get; set; } = false;
//public EduProgramShortDTO? Program { get; set; }