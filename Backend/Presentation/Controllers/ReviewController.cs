using Application.Abstractions.Files;
using Application.Features.Reviews.Commands.Create;
using Application.Features.Reviews.Commands.Delete;
using Application.Features.Reviews.Commands.Update;
using Application.Features.Reviews.Quaries.GetReviewById;
using Application.Features.Reviews.Quaries.GetReviewFile;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    public class ReviewController : BaseController
    {
        private readonly IMediator _mediator;

        public ReviewController(IMinioService minioService, IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReview(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return FromResult(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteReview(DeleteReviewCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return FromResult(result);
        }

        [HttpPatch]
        public async Task<IActionResult> DeleteReview(UpdateReviewCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return FromResult(result);
        }

        [HttpGet("{reviewId}")]
        public async Task<IActionResult> GetReview(Guid reviewId, CancellationToken cancellationToken)
        {
            GetReviewByIdQuery query = new(reviewId);

            var result = await _mediator.Send(query, cancellationToken);
            return FromResult(result);
        }

        [HttpGet("File/{reviewId}")]
        public async Task<IActionResult> GetReviewFile(Guid reviewId, CancellationToken cancellationToken)
        {
            GetReviewFileQuery query = new(reviewId);

            var result = await _mediator.Send(query, cancellationToken);
            return File(result.Value, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "example.docx");
        }

    }
}
