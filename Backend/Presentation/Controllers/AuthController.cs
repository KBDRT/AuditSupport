using Application.DTO.Users;
using Application.Services.Definitions;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Presentation.Contracts.User;
using Presentation.Settings;
using System.Security.Claims;
using System.Security.Principal;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IAuthService _service;
        private readonly IOptions<AuthTokenSettings> _authSettings;
        private readonly IMapper _mapper;

        public AuthController(IAuthService service,
                              IOptions<AuthTokenSettings> authSettings,
                              IMapper mapper)
        {
            _service = service;
            _authSettings = authSettings;
            _mapper = mapper;
        }

        [HttpGet("CheckAuth")]
        [ProducesResponseType(typeof(AuthSuccessResponse), 200)]
        public async Task<IActionResult> CheckAuth()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
                var role = User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

                return Ok(new AuthSuccessResponse(userId, role));
            }
            return Unauthorized();
        }


        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete(_authSettings.Value.CookieNameForToken);
            return Ok();
        }


        [HttpPost("Login")]
        [ProducesResponseType(typeof(AuthSuccessResponse), 200)]
        public async Task<IActionResult> LoginUser(LoginUserRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<LoginUserDTO>(request);
            var result = await _service.LoginUser(dto, cancellationToken);

            if (result.IsSuccess)
            {
                var resultValue = result.Value;
                Response.Cookies.Append(_authSettings.Value.CookieNameForToken, resultValue.Token,
                new CookieOptions
                {
                    Expires = DateTime.UtcNow.Add(_authSettings.Value.TokenLifeTime),
                    Secure = false
                });

                return Ok(new AuthSuccessResponse(resultValue.UserId, resultValue.Role));
            }

            return NotFound();

        }

    }
}
