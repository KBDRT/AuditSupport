using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Commands.ChangeStatus
{
    public class ChangeProgramStatusCommandHandler : IRequestHandler<ChangeProgramStatusCommand, UnitResult<ServiceError>>
    {
        private readonly IBaseRepository<EduProgram> _repository;

        public ChangeProgramStatusCommandHandler(IBaseRepository<EduProgram> repository)
        {
            _repository = repository;
        }

        public async Task<UnitResult<ServiceError>> Handle(ChangeProgramStatusCommand request, CancellationToken cancellationToken)
        {
            var program = await _repository.GetById(request.ProgramId, cancellationToken);
            if (program == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, "Не найден"));
            }

            if (program.ProgramStatus != request.NewStatus)
            {
                program.ProgramStatus = request.NewStatus;
                await _repository.Update(program, cancellationToken);
            }

            return Result.Success<ServiceError>();
        }
    }
}
