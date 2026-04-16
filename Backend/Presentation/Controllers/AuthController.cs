using Application.DTO.Users;
using Application.Services.Definitions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Presentation.Contracts.User;
using Presentation.Settings;

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
        public async Task<IActionResult> CheckAuth()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                return Ok();
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
        public async Task<IActionResult> LoginUser(LoginUserRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<LoginUserDTO>(request);
            var result = await _service.LoginUser(dto, cancellationToken);

            if (result.IsSuccess)
            {
                Response.Cookies.Append(_authSettings.Value.CookieNameForToken, result.Value,
                new CookieOptions
                {
                    Expires = DateTime.UtcNow.Add(_authSettings.Value.TokenLifeTime),
                });
                return Ok();
            }

            return NotFound();

        }

    }
}
