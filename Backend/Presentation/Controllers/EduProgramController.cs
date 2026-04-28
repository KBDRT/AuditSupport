using Application.Abstractions.Files;
using Application.DTO.Common;
using Application.DTO.Programs;
using Application.Features.Programs.Commands.ChangeStatus;
using Application.Features.Programs.Commands.Create;
using Application.Features.Programs.Commands.CreateVersion;
using Application.Features.Programs.Commands.Delete;
using Application.Features.Programs.Commands.Update;
using Application.Features.Programs.Quaries.GetProgramById;
using Application.Features.Programs.Quaries.GetProgramsForTeacher;
using Application.Features.Programs.Quaries.GetProgramsWithFilter;
using Application.Features.Programs.Quaries.GetProgramVersion;
using Application.Features.Programs.Quaries.GetProgramVersionFile;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.EduPrograms;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EduProgramController : BaseController
    {
        private readonly IMediator _mediator;

        public EduProgramController(IMinioService minioService, IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost()]
        [ProducesResponseType(typeof(Guid), 200)]
        public async Task<IActionResult> New(CreateProgramCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return FromResult(result);
        }


        [HttpPost("Version")]
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
            return FromResult(result);
        }

        [HttpGet("Version/File/{versionId}")]
        public async Task<IActionResult> GetVersionFile(Guid versionId, CancellationToken cancellationToken)
        {
            GetProgramVersionFileQuery query = new(versionId);

            var result = await _mediator.Send(query, cancellationToken);

            return File(result.Value, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "example.docx");
        }


        [HttpGet("{programId}")]
        public async Task<IActionResult> GetProgramById(Guid programId, CancellationToken cancellationToken)
        {
            GetProgramByIdQuery query = new(programId);

            var result = await _mediator.Send(query, cancellationToken);
            return FromResult(result);
        }


        [HttpGet("Version/{versionId}")]
        public async Task<IActionResult> GetProgramVersion(Guid versionId, CancellationToken cancellationToken)
        {
            GetProgramVersionQuery query = new(versionId);

            var result = await _mediator.Send(query, cancellationToken);
            return FromResult(result);
        }


        [HttpGet]
        public async Task<IActionResult> GetProgramsWithFilter([FromQuery] GetProgramsWithFilterQuery query, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(query, cancellationToken);
            return FromResult(result);
        }

        [HttpPatch("Status")]
        public async Task<IActionResult> ChangeStatus(ChangeProgramStatusCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return FromResult(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProgram(DeleteProgramCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return FromResult(result);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateProgram(UpdateProgramCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return FromResult(result);
        }

        [HttpGet("Years/{teacherId}")]
        [ProducesResponseType(typeof(List<ShortYearDTO>), 200)]
        public async Task<IActionResult> GetGroupedPrograms(Guid teacherId, CancellationToken cancellationToken)
        {
            GetProgramsForTeacherQuery query = new(teacherId);

            var result = await _mediator.Send(query, cancellationToken);
            return FromResult(result);
        }

    }
}
