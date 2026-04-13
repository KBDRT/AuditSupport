using Application.DTO;
using AutoMapper;
using Presentation.Contracts.User;

namespace Presentation.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserRequest, CreateUserDTO>();
        }
    }
}
