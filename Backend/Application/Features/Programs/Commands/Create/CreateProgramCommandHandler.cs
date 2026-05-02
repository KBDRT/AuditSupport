using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Commands.Create
{
    public class CreateProgramCommandHandler : IRequestHandler<CreateProgramCommand, Result<CreateOperationResponseDTO, ServiceError>>
    {
        private readonly IBaseRepository<EduProgram> _repository;

        public CreateProgramCommandHandler(IBaseRepository<EduProgram> repository)
        {
            _repository = repository;
        }

        public async Task<Result<CreateOperationResponseDTO, ServiceError>> Handle(CreateProgramCommand request, CancellationToken cancellationToken)
        {
            EduProgram program = new()
            {
                AgesOfChildrens = request.AgesOfChildrens,
                DirectionId = request.DirectionId,
                Duration = request.Duration,
                Id = Guid.NewGuid(),
                Name = request.Name,
                TeacherId = request.TeacherId,
                EduYearId = request.YearId,
            };

            await _repository.AddNew(program, cancellationToken);

            return Result.Success<CreateOperationResponseDTO, ServiceError>(new(program.Id));
        }
    }
}
