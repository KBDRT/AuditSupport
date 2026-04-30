using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Programs;
using AutoMapper;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Quaries.GetErrorsByCheckId
{
    public class GetErrorsByCheckIdQueryHandler : IRequestHandler<GetErrorsByCheckIdQuery, Result<List<ShortCheckErrorDTO>, ServiceError>>
    {

        private readonly ICheckErrorRepository _repository;
        private readonly IMapper _mapper;

        public GetErrorsByCheckIdQueryHandler(ICheckErrorRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Result<List<ShortCheckErrorDTO>, ServiceError>> Handle(GetErrorsByCheckIdQuery request, CancellationToken cancellationToken)
        {
            var errors = await _repository.GetErrorsByCheckId(request.CheckId, cancellationToken);

            var mapped = _mapper.Map<List<ShortCheckErrorDTO>>(errors);

            return Result.Success<List<ShortCheckErrorDTO>, ServiceError>(mapped);
        }
    }
}
