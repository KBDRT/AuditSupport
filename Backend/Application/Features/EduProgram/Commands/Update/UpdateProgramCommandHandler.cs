using Application.Abstractions.Repositories;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.EduProgram.Commands.Update
{
    public class UpdateProgramCommandHandler : IRequestHandler<UpdateProgramCommand, Result>
    {
        private readonly IBaseRepository<Domain.Entities.EduProgram> _repository;

        public UpdateProgramCommandHandler(IBaseRepository<Domain.Entities.EduProgram> repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(UpdateProgramCommand request, CancellationToken cancellationToken)
        {
            var program = await _repository.GetByIdAsync(request.ProgramId, cancellationToken);

            if (program == null)
            {
                return Result.Failure("Not found!");
            }

            program.Name = request.Name;
            program.AgesOfChildrens = request.AgesOfChildrens;
            program.Duration = request.Duration;
            program.DirectionId = request.DirectionId;

            await _repository.UpdateAsync(program, cancellationToken);

            return Result.Success();
        }
    }
}
