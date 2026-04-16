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

            var statusCode = GetStatusCode(serviceResult.Error.Code);
            return new JsonResult(serviceResult.Error)
            {
                StatusCode = statusCode
            };
        }

        [NonAction]
        public IActionResult FromResult<T>(Result<T, ServiceError> serviceResult)
        {
            if (serviceResult.IsSuccess)
                return Ok(serviceResult.Value);

            var statusCode = GetStatusCode(serviceResult.Error.Code);
            return new JsonResult(serviceResult.Error)
            {
                StatusCode = statusCode
            };
        }


        private int GetStatusCode(ErrorsCode code)
        {
            return code switch
            {
                ErrorsCode.NOT_FOUND => StatusCodes.Status404NotFound,
                ErrorsCode.INCORRECT_PARAMETERS => StatusCodes.Status400BadRequest,
                ErrorsCode.EXISTING_RECORD => StatusCodes.Status409Conflict,
                _ => StatusCodes.Status409Conflict,
            };
        }


    }
}
