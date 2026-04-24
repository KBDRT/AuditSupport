using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Commands.Update
{
    public class UpdateProgramCommandHandler : IRequestHandler<UpdateProgramCommand, UnitResult<ServiceError>>
    {
        private readonly IBaseRepository<EduProgram> _repository;

        public UpdateProgramCommandHandler(IBaseRepository<EduProgram> repository)
        {
            _repository = repository;
        }

        public async Task<UnitResult<ServiceError>> Handle(UpdateProgramCommand request, CancellationToken cancellationToken)
        {
            var program = await _repository.GetById(request.ProgramId, cancellationToken);

            if (program == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            program.Name = request.Name;
            program.AgesOfChildrens = request.AgesOfChildrens;
            program.Duration = request.Duration;
            program.DirectionId = request.DirectionId;

            await _repository.Update(program, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}
