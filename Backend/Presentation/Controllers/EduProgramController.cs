using Application.Abstractions.Files;
using Application.Features.EduProgram.Commands.Create;
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


        [HttpPost]
        public async Task<IActionResult> Put([FromForm] CreateVersionRequest request, CancellationToken cancellationToken)
        {
            var file = request.file;
            if (file == null || file.Length == 0)
            {
                return BadRequest("Empty file");
            }

            if (Path.GetExtension(file.FileName) != ".docx")
            {
                return BadRequest("Incorrect format");
            }


            using var fileStream = file.OpenReadStream();
            await _minioService.PutFile(fileStream, "test");

            return Ok();
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var file = await _minioService.GetFile("test");

            return File(file, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "example.docx");
        }




        [HttpPost("test")]
        public async Task<IActionResult> New(CreateProgramCommand request, CancellationToken cancellationToken)
        {
            var result = _mediator.Send(request, cancellationToken);


            return Ok();
        }

    }
}
