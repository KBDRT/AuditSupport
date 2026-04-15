using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Programs.Quaries.GetProgramVersion
{
    public record GetProgramVersionQuery
    (
        Guid VersionId
    ) : IRequest<Result<ProgramVersion, ServiceError>>;
}
