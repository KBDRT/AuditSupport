using Application.Helpers;
using Application.Services.Definitions;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize(Policy = "RoleAdmin")]
    public class DirectionController(IDirectionService service) : ControllerBase
    {
        private readonly IDirectionService _service = service;

        [HttpPost]
        public async Task<IActionResult> AddNewTask(string name, string shortName, string description, CancellationToken cancellationToken)
        {
            var result = await _service.Create(name, shortName, description, cancellationToken);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return NotFound();
        }


        [HttpGet]
        public async Task<IActionResult> GetTasks(CancellationToken cancellationToken)
        {
            var result = await _service.Get(cancellationToken);
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTask(Guid guid, CancellationToken cancellationToken)
        {
            var result = await _service.Delete(guid, cancellationToken);
            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest();
        }


        [HttpPut]
        public async Task<IActionResult> UpdateTask(Direction direction, CancellationToken cancellationToken)
        {
            var result = await _service.Update(direction, cancellationToken);
            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest();
        }

    }
}
