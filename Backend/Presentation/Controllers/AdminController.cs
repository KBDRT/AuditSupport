using Application.DTO.Common;
using Application.DTO.Users;
using Application.Services.Definitions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.Common;
using Presentation.Contracts.User;

namespace Presentation.Controllers
{
    [Route("[controller]/Users")]
    [ApiController]
   
    public class AdminController : BaseController
    {
        private readonly IAdminService _service;
        private readonly IMapper _mapper;

        public AdminController(IAdminService service,
                               IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }


        [HttpPost]
        [ProducesResponseType(typeof(Guid), 200)]
        public async Task<IActionResult> RegisterUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var serviceRequest = _mapper.Map<CreateUserDTO>(request);   

            var result = await _service.CreateUser(serviceRequest, cancellationToken);

            return FromResult(result);
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteUser(Guid userId, CancellationToken cancellationToken)
        {
            var result = await _service.DeleteUser(userId, cancellationToken);

            return FromResult(result);
        }


        [HttpPatch("Activation")]
        public async Task<IActionResult> ChangeActivationUser(ChangeUserActivationRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<ChangeUserActivationDTO>(request);

            var result = await _service.ChangeUserActivation(dto, cancellationToken);
            return FromResult(result);
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(typeof(string), 200)]
        public async Task<IActionResult> ResetPassword(Guid userId, CancellationToken cancellationToken)
        {
            var result = await _service.ResetPassword(userId, cancellationToken);
            return FromResult(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<GetUserDTO>), 200)]
        public async Task<IActionResult> GetUsers([FromQuery] PaginationRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<PaginationDTO>(request);

            var result = await _service.GetUsers(dto, cancellationToken);
            return FromResult(result);
        }

        [HttpPatch("Email")]
        public async Task<IActionResult> ChangeUserEmail(ChangeUserEmailRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<ChangeUserEmailDTO>(request);

            var result = await _service.ChangeEmail(dto, cancellationToken);
            return FromResult(result);
        }

    }
}
