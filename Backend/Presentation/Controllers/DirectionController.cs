using Application.Helpers;
using Application.Logic.Services.Definitions;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DirectionController(ServiceResult result, IDirectionService service) : ControllerBase
    {
        private readonly ServiceResult _serviceResult = result;
        private readonly IDirectionService _service = service;

        [HttpPost]
        public async Task<IActionResult> AddNewTask(CancellationToken cancellationToken)
        {
            _serviceResult.Messages.Add(new("test1"));

            var result = await _service.Create("a", "b", "c");

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return NotFound();
        }


        [HttpGet]
        public async Task<IActionResult> GetTasks(CancellationToken cancellationToken)
        {
            var result = await _service.Get();
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTask(Guid guid, CancellationToken cancellationToken)
        {
            var result = await _service.Delete(guid);
            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest();
        }


        [HttpPut]
        public async Task<IActionResult> UpdateTask(Direction direction, CancellationToken cancellationToken)
        {
            var result = await _service.Update(direction);
            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest();
        }

    }
}
