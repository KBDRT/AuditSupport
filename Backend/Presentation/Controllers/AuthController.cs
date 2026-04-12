using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Presentation.Settings;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IOptions<AuthTokenSettings> _authSettings;

        public AuthController(IOptions<AuthTokenSettings> authSettings)
        {
            _authSettings = authSettings;
        }

        [HttpPost("/login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequest request,
                                                  CancellationToken cancellationToken)
        {
            //var result = await _mediator.Send(new LoginUserCommand(request.Login, request.Password));

            //if (result.ResultCode == CQResultStatusCode.Success && result.ResultData != null)
            //{
            //    Response.Cookies.Append(_authSettings.Value.CookieNameForToken, result.ResultData,
            //    new CookieOptions
            //    {
            //        Expires = DateTime.UtcNow.Add(_authSettings.Value.TokenLifeTime),
            //    });

            //    return Ok(request.Login);
            ////}

            return NotFound();

        }


    }
}
