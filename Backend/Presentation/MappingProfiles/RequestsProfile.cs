using Application.DTO.Directions;
using Application.DTO.Users;
using Application.DTO.Years;
using AutoMapper;
using Presentation.Contracts.Direction;
using Presentation.Contracts.User;
using Presentation.Contracts.Year;

namespace Presentation.MappingProfiles
{
    public class RequestsProfile : Profile
    {
        public RequestsProfile()
        {
            CreateMap<CreateDirectionRequest, CreateDirectionDTO>();
            CreateMap<UpdateDirectionRequest, UpdateDirectionDTO>();

            CreateMap<CreateUserRequest, CreateUserDTO>();
            CreateMap<ChangeUserActivationRequest, ChangeUserActivationDTO>();
            CreateMap<ChangeUserEmailRequest, ChangeUserEmailDTO>();
            CreateMap<LoginUserRequest, LoginUserDTO>();
            CreateMap<UpdateUserRequest, UpdateUserDTO>();
            CreateMap<CreateUserResponseDTO, CreateUserResponse>();

            CreateMap<CreateYearRequest, CreateYearDTO>();
            CreateMap<UpdateYearRequest, UpdateYearDTO>();
            CreateMap<ChangeYearStatusRequest, ChangeYearStatusDTO>();
        }

    }
}
