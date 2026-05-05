using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Reviews;
using AutoMapper;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Reviews.Quaries.GetReviewById
{
    public class GetReviewByIdQueryHandler : IRequestHandler<GetReviewByIdQuery, Result<GetReviewResponseDTO, ServiceError>>
    {

        private readonly IReviewRepository _repository;
        private readonly IMapper _mapper;

        public GetReviewByIdQueryHandler(IReviewRepository repository,
                                         IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Result<GetReviewResponseDTO, ServiceError>> Handle(GetReviewByIdQuery request, CancellationToken cancellationToken)
        {
            var review = await _repository.GetReviewWithInfo(request.ReviewId, cancellationToken);
            if (review == null)
            {
                return Result.Failure<GetReviewResponseDTO, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            var result = _mapper.Map<GetReviewResponseDTO>(review);


            return Result.Success<GetReviewResponseDTO, ServiceError>(result);
        }
    }
}
