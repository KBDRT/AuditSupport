using Application.Abstractions.Files;
using Application.Features.Programs.Commands.ChangeStatus;
using Application.Features.Programs.Commands.Create;
using Application.Features.Programs.Commands.CreateVersion;
using Application.Features.Programs.Commands.Delete;
using Application.Features.Programs.Commands.Update;
using Application.Features.Programs.Quaries.GetProgramForUser;
using Application.Features.Programs.Quaries.GetProgramsWithFilter;
using Application.Features.Programs.Quaries.GetProgramVersionFile;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.EduPrograms;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EduProgramController : ControllerBase
    {
        private readonly IMinioService _minioService;
        private readonly IMediator _mediator;

        public EduProgramController(IMinioService minioService, IMediator mediator)
        {
            _minioService = minioService;
            _mediator = mediator;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> New(CreateProgramCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);

            return Ok();
        }


        [HttpPost("AddVersion")]
        public async Task<IActionResult> NewVersion([FromForm] CreateVersionRequest request, CancellationToken cancellationToken)
        {
            var file = request.File;
            if (file == null || file.Length == 0)
            {
                return BadRequest("Empty file");
            }

            if (Path.GetExtension(file.FileName) != ".docx")
            {
                return BadRequest("Incorrect format");
            }

            using var stream = file.OpenReadStream();
            CreateProgramVersionCommand command = new(request.ProgramId, request.Changes, stream);
            var result = await _mediator.Send(command, cancellationToken);

            return Ok();
        }

        [HttpGet("GetVersionFile")]
        public async Task<IActionResult> GetVersionFile(Guid versionId, CancellationToken cancellationToken)
        {
            GetProgramVersionFileQuery query = new(versionId);

            var result = await _mediator.Send(query, cancellationToken);

            return File(result.Value, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "example.docx");
        }

        [HttpGet("GetForUser")]
        public async Task<IActionResult> GetProgramForUser(GetProgramForUserQuery query, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(query, cancellationToken);

            return Ok(result.Value);
        }

        [HttpGet("GetListWithFilter")]
        public async Task<IActionResult> GetProgramsWithFilter(GetProgramsWithFilterQuery query, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(query, cancellationToken);

            return Ok(result.Value);
        }

        [HttpPatch("ChangeStatus")]
        public async Task<IActionResult> ChangeStatus(ChangeProgramStatusCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteProgram(DeleteProgramCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("Update")]
        public async Task<IActionResult> UpdateProgram(UpdateProgramCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);

            return Ok();
        }

    }
}
