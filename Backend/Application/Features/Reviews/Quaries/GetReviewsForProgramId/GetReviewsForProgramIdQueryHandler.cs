using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Reviews;
using AutoMapper;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Reviews.Quaries.GetReviewsForProgramId
{
    public class GetReviewsForProgramIdQueryHandler : IRequestHandler<GetReviewsForProgramIdQuery, Result<List<ShortReviewResponseDTO>, ServiceError>>
    {

        private readonly IReviewRepository _repository;
        private readonly IMapper _mapper;

        public GetReviewsForProgramIdQueryHandler(IReviewRepository repository,
                                                  IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }


        public async Task<Result<List<ShortReviewResponseDTO>, ServiceError>> Handle(GetReviewsForProgramIdQuery request, CancellationToken cancellationToken)
        {
            var reviews = await _repository.GetReviewsForProgram(request.ProgramId, cancellationToken);

            var result = _mapper.Map<List<ShortReviewResponseDTO>>(reviews);

            return Result.Success<List<ShortReviewResponseDTO>, ServiceError>(result);
        }
    }
}
