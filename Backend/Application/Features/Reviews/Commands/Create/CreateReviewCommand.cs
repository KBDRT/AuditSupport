using Application.Common;
using Application.DTO.Common;
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
        Guid ProgramId,
        //Guid VersionId,
        Guid AuditorId
        //string Commentary,
        //bool IsSuccess,
        //bool IsFinished,
        //Stream? File
    ) : IRequest<Result<CreateOperationResponseDTO, ServiceError>>;
}
