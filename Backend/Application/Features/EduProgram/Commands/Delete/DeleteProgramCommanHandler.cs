using Application.Abstractions.Repositories;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.EduProgram.Commands.Delete
{
    public class DeleteProgramCommandHandler : IRequestHandler<DeleteProgramCommand, Result>
    {
        private readonly IBaseRepository<Domain.Entities.EduProgram> _repository;

        public DeleteProgramCommandHandler(IBaseRepository<Domain.Entities.EduProgram> repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(DeleteProgramCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteByIdAsync(request.ProgramId, cancellationToken);

            return Result.Success();
        }
    }
}
