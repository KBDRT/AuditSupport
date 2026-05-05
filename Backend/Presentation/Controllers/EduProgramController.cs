using Application.Abstractions.Files;
using Application.DTO.Common;
using Application.DTO.Programs;
using Application.Features.Programs.Commands.ChangeStatus;
using Application.Features.Programs.Commands.Create;
using Application.Features.Programs.Commands.CreateVersion;
using Application.Features.Programs.Commands.Delete;
using Application.Features.Programs.Commands.Update;
using Application.Features.Programs.Quaries.GetErrorsByCheckId;
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
        [ProducesResponseType(typeof(CreateOperationResponseDTO), 200)]
        public async Task<IActionResult> New(CreateProgramCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return FromResult(result);
        }


        [HttpPost("Version")]
        [ProducesResponseType(typeof(CreateVersionResponseDTO), 200)]
        public async Task<IActionResult> NewVersion([FromForm] CreateVersionRequest request, CancellationToken cancellationToken)
        {
            var file = request.File;
            if (file == null || file.Length == 0)
            {
                return BadRequest("Empty file");
            }

            //if (Path.GetExtension(file.FileName) != ".docx")
            //{
            //    return BadRequest("Incorrect format");
            //}

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

            var encodedFileName = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(result.Value.FileName));

            Response.Headers.Append("X-File-Name", encodedFileName);
            Response.Headers.Append("Access-Control-Expose-Headers", "X-File-Name");

            return File(result.Value.FileStream, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        }


        [HttpGet("{programId}")]
        [ProducesResponseType(typeof(EduProgramDTO), 200)]
        public async Task<IActionResult> GetProgramById(Guid programId, CancellationToken cancellationToken, bool onlyLastVersion = false)
        {
            GetProgramByIdQuery query = new(programId, onlyLastVersion);

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
        [ProducesResponseType(typeof(List<EduProgramShortDTO>), 200)]
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

        [HttpGet("Errors/{checkId}")]
        [ProducesResponseType(typeof(List<ShortCheckErrorDTO>), 200)]
        public async Task<IActionResult> GetErrorsForCheck(Guid checkId, CancellationToken cancellationToken)
        {
            GetErrorsByCheckIdQuery query = new(checkId);

            var result = await _mediator.Send(query, cancellationToken);
            return FromResult(result);
        }

    }
}
