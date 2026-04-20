using Application.DTO.Common;
using AutoMapper;
using Presentation.Contracts.Common;

namespace Presentation.MappingProfiles
{
    public class CommonProfile : Profile
    {
        public CommonProfile()
        {
            CreateMap<PaginationRequest, PaginationDTO>();

            CreateMap<CreateOperationResponseDTO, CreateResponse>();
        }
    }
}
