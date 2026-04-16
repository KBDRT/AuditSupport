using Application.Common;
using CSharpFunctionalExtensions;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Reviews.Commands.Create
{
    public record CreateReviewCommand
    (
        Guid VersionId,
        Guid AuditorId,
        string Commentary,
        bool IsSuccess,
        Stream File
    ) : IRequest<Result<Guid, ServiceError>>;
}
