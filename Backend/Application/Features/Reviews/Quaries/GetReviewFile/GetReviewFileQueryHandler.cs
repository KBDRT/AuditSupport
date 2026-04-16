using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Reviews.Quaries.GetReviewFile
{
    public class GetReviewFileQueryHandler : IRequestHandler<GetReviewFileQuery, Result<Stream, ServiceError>>
    {

        private readonly IBaseRepository<ProgramReview> _repository;

        public GetReviewFileQueryHandler(IBaseRepository<ProgramReview> repository)
        {
            _repository = repository;
        }
        public Task<Result<Stream, ServiceError>> Handle(GetReviewFileQuery request, CancellationToken cancellationToken)
        {
            // get from minio


            throw new NotImplementedException();
        }
    }
}
