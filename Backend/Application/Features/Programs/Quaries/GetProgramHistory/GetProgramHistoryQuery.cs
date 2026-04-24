using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramHistory
{
    public record GetProgramHistoryQuery
    (
        Guid ProgramId
    ) : IRequest<Result<List<ProgramHistory>, ServiceError>>;
}
