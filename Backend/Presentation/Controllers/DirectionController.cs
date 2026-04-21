using Application.DTO.Common;
using Application.DTO.Directions;
using Application.DTO.Users;
using Application.Helpers;
using Application.Services.Definitions;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.Common;
using Presentation.Contracts.Direction;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize(Policy = "RoleAdmin")]
    public class DirectionController : BaseController
    {
        private readonly IDirectionService _service;

        private readonly IMapper _mapper;

        public DirectionController(IDirectionService service,
                                   IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(typeof(CreateOperationResponseDTO), 200)]
        public async Task<IActionResult> AddNewDirection(CreateDirectionRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<CreateDirectionDTO>(request);

            var result = await _service.Create(dto, cancellationToken);
            return FromResult(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<Direction>), 200)]
        public async Task<IActionResult> GetDirections(CancellationToken cancellationToken)
        {
            var result = await _service.Get(cancellationToken);
            return FromResult(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteDirection(Guid guid, CancellationToken cancellationToken)
        {
            var result = await _service.Delete(guid, cancellationToken);
            return FromResult(result);
        }


        [HttpPut]
        public async Task<IActionResult> UpdateDirection(UpdateDirectionRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<UpdateDirectionDTO>(request);

            var result = await _service.Update(dto, cancellationToken);
            return FromResult(result);
        }

    }
}
