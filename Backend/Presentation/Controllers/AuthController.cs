using Application.Services.Definitions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Presentation.Settings;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        private readonly IOptions<AuthTokenSettings> _authSettings;

        public AuthController(IAuthService service,
                              IOptions<AuthTokenSettings> authSettings)
        {
            _service = service;
            _authSettings = authSettings;
        }

        [HttpGet("/checkauth")]
        public async Task<IActionResult> CheckAuth()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                return Ok();
            }
            return Unauthorized();
        }


        [HttpGet("/logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete(_authSettings.Value.CookieNameForToken);
            return Ok();
        }


        [HttpPost("/login")]
        public async Task<IActionResult> LoginUser(string login, string password, CancellationToken cancellationToken)
        {
            var result = await _service.LoginUser(login, password, cancellationToken);

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
