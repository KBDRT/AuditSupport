using Application.DTO;
using Application.Services.Definitions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.User;
using System.ComponentModel.DataAnnotations;

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


        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var serviceRequest = _mapper.Map<CreateUserDTO>(request);   


            var result = await _service.CreateUser(serviceRequest, cancellationToken);

            if (result.IsSuccess)
                return Ok();

            return Conflict(result.Error);
        }


        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteUser(Guid userId, CancellationToken cancellationToken)
        {
            var result = await _service.DeleteUser(userId, cancellationToken);

            if (result.IsSuccess)
                return Ok();

            return Conflict(result.Error);
        }


        [HttpPatch("Activation")]
        public async Task<IActionResult> ChangeActivationUser(Guid userId, bool isActive, CancellationToken cancellationToken)
        {
            var result = await _service.ChangeUserActivation(userId, isActive, cancellationToken);

            if (result.IsSuccess)
                return Ok();

            return Conflict(result.Error);
        }

        [HttpGet("ResetPassword")]
        public async Task<IActionResult> ResetPassword(Guid userId, CancellationToken cancellationToken)
        {
            var result = await _service.ResetPassword(userId, cancellationToken);

            if (result.IsSuccess)
                return Ok(result.Value);

            return Conflict(result.Error);
        }


        [HttpGet("Users")]
        public async Task<IActionResult> GetUsers(int page, int size, CancellationToken cancellationToken)
        {
            var result = await _service.GetUsers(page, size, cancellationToken);

            if (result.IsSuccess)
                return Ok(result.Value);

            return Conflict(result.Error);
        }

        [HttpPatch("ChangeEmail")]
        public async Task<IActionResult> ChangeUserEmail(Guid userId, [EmailAddress] string newEmail, CancellationToken cancellationToken)
        {
            var result = await _service.ChangeEmail(userId, newEmail, cancellationToken);

            if (result.IsSuccess)
                return Ok();

            return Conflict(result.Error);
        }

    }
}
