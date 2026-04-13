using Application.DTO;
using Application.Services.Definitions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.User;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [ProducesResponseType(409)]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _service;
        private readonly IMapper _mapper;

        public AdminController(IAdminService service,
                               IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var serviceRequest = _mapper.Map<CreateUserDTO>(request);   


            var result = await _service.CreateUser(serviceRequest, cancellationToken);

            if (result.IsSuccess)
                return Ok();

            return Conflict(result.Error);
        }


    }
}
