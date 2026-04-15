using Application.Abstractions.Repositories;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Commands.Update
{
    public class UpdateProgramCommandHandler : IRequestHandler<UpdateProgramCommand, Result>
    {
        private readonly IBaseRepository<EduProgram> _repository;

        public UpdateProgramCommandHandler(IBaseRepository<EduProgram> repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(UpdateProgramCommand request, CancellationToken cancellationToken)
        {
            var program = await _repository.GetById(request.ProgramId, cancellationToken);

            if (program == null)
            {
                return Result.Failure("Not found!");
            }

            program.Name = request.Name;
            program.AgesOfChildrens = request.AgesOfChildrens;
            program.Duration = request.Duration;
            program.DirectionId = request.DirectionId;

            await _repository.Update(program, cancellationToken);

            return Result.Success();
        }
    }
}
