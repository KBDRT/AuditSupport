using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Commands.Delete
{
    public class DeleteProgramCommandHandler : IRequestHandler<DeleteProgramCommand, UnitResult<ServiceError>>
    {
        private readonly IBaseRepository<Domain.Entities.ProgramVersion> _repository;

        public DeleteProgramCommandHandler(IBaseRepository<Domain.Entities.ProgramVersion> repository)
        {
            _repository = repository;
        }

        public async Task<UnitResult<ServiceError>> Handle(DeleteProgramCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteById(request.ProgramId, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}
