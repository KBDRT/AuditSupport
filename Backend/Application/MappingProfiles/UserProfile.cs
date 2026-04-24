using Application.DTO.Users;
using AutoMapper;
using Domain.Entities.References;
using Domain.Values;

namespace Application.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserDTO, User>()
                .ForMember(dest => dest.Initials, opt => opt.MapFrom(src => new PersonInitials() { Name = src.Name, Surname = src.Surname, Patronymic = src.Patronymic }));

            CreateMap<User, GetUserDTO>();
        }
    }
}
