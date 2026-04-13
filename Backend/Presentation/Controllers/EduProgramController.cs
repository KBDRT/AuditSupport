using Application.Abstractions.Files;
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
        public EduProgramController(IMinioService minioService)
        {
            _minioService = minioService;
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


    }
}
