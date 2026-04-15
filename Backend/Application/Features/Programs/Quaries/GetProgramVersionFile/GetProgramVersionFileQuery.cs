using Application.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramVersionFile
{
    public record GetProgramVersionFileQuery
    (
        Guid Versionid
    ) : IRequest<Result<Stream, ServiceError>>;
}
