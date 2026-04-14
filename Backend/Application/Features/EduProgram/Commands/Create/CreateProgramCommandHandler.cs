using Application.Abstractions.Repositories;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.EduProgram.Commands.Create
{
    public class CreateProgramCommandHandler : IRequestHandler<CreateProgramCommand, Result>
    {
        private readonly IBaseRepository<Domain.Entities.EduProgram> _repository;

        public CreateProgramCommandHandler(IBaseRepository<Domain.Entities.EduProgram> repository)
        {
            _repository = repository;
        }

        public async Task<Result> Handle(CreateProgramCommand request, CancellationToken cancellationToken)
        {
            Domain.Entities.EduProgram program = new()
            {
                AgesOfChildrens = request.AgesOfChildrens,
                DirectionId = request.DirectionId,
                Duration = request.Duration,
                Id = Guid.NewGuid(),
                Name = request.Name,
                TeacherId = request.TeacherId,
                YearId = request.YearId,
            };

            await _repository.AddNewAsync(program, cancellationToken);

            return Result.Success();
        }
    }
}
