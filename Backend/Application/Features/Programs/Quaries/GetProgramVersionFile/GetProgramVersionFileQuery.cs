using Application.Common;
using Application.DTO.Programs;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramVersionFile
{
    public record GetProgramVersionFileQuery
    (
        Guid Versionid
    ) : IRequest<Result<GetProgramFileResponseDTO, ServiceError>>;
}
