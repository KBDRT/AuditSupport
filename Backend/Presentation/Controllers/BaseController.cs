using Application.Common;
using Application.Helpers;
using CSharpFunctionalExtensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [ProducesResponseType(409)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]

    public class BaseController : ControllerBase
    {
        [NonAction]
        public IActionResult FromResult(UnitResult<ServiceError> serviceResult)
        {
            if (serviceResult.IsSuccess)
                return Ok();

            return serviceResult.Error.Code switch
            {
                ErrorsCode.NOT_FOUND => NotFound(serviceResult.Error),
                ErrorsCode.INCORRECT_PARAMETERS => BadRequest(serviceResult.Error),
                ErrorsCode.EXISTING_RECORD => Conflict(serviceResult.Error),
                _ => StatusCode(500, serviceResult.Error)
            };
        }

        [NonAction]
        public IActionResult FromResult<T>(Result<T, ServiceError> serviceResult)
        {
            if (serviceResult.IsSuccess)
                return Ok(serviceResult.Value);

            return serviceResult.Error.Code switch
            {
                ErrorsCode.NOT_FOUND => NotFound(serviceResult.Error),
                ErrorsCode.INCORRECT_PARAMETERS => BadRequest(serviceResult.Error),
                ErrorsCode.EXISTING_RECORD => Conflict(serviceResult.Error),
                _ => StatusCode(500, serviceResult.Error)
            };
        }

    }
}
