using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramForUser
{
   public record GetProgramForUserQuery
   (
        Guid YearId,
        Guid TeacherId
    ) : IRequest<Result<EduProgram, ServiceError>>;
}
