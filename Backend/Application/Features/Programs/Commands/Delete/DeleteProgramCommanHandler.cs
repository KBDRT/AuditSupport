using Application.Abstractions.Repositories;
using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using Domain.Enums;
using MediatR;

namespace Application.Features.Programs.Commands.Delete
{
    public class DeleteProgramCommandHandler : IRequestHandler<DeleteProgramCommand, UnitResult<ServiceError>>
    {
        private readonly IBaseRepository<EduProgram> _repository;

        public DeleteProgramCommandHandler(IBaseRepository<EduProgram> repository)
        {
            _repository = repository;
        }

        public async Task<UnitResult<ServiceError>> Handle(DeleteProgramCommand request, CancellationToken cancellationToken)
        {
            var program = await _repository.GetById(request.ProgramId);
            if (program == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            if (program.ProgramStatus != ProgramStatuses.Created)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.CONFLICT, ""));
            }


            program.ProgramStatus = ProgramStatuses.Deleted;
            await _repository.Update(program);

            //await _repository.DeleteById(request.ProgramId, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}
