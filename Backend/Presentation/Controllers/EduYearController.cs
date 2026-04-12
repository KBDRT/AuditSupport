using Application.Helpers;
using Application.Logic.Services.Definitions;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EduYearController(ServiceResult result, IEduYearService service) : ControllerBase
    {
        private readonly ServiceResult _serviceResult = result;
        private readonly IEduYearService _service = service;

        [HttpPost]
        public async Task<IActionResult> AddNewTask(int startYear, string description, CancellationToken cancellationToken)
        {
            var result = await _service.Create(startYear, description, cancellationToken);

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
        public async Task<IActionResult> UpdateTask(EduYear eduYear, CancellationToken cancellationToken)
        {
            var result = await _service.Update(eduYear, cancellationToken);
            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPatch]
        public async Task<IActionResult> ChangeYearStatus(Guid yearId, bool isOpenYear, CancellationToken cancellationToken)
        {
            var result = await _service.ChangeStatus(yearId, isOpenYear, cancellationToken);
            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest();
        }

    }
}
