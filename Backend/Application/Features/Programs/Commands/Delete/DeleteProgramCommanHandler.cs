using Application.Abstractions.Repositories;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Commands.Delete
{
    public class DeleteProgramCommandHandler : IRequestHandler<DeleteProgramCommand, Result>
    {
        private readonly IBaseRepository<Domain.Entities.ProgramVersion> _repository;

        public DeleteProgramCommandHandler(IBaseRepository<Domain.Entities.ProgramVersion> repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(DeleteProgramCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteById(request.ProgramId, cancellationToken);

            return Result.Success();
        }
    }
}
