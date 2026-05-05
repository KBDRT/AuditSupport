using Application.DTO.Programs;
using Domain.Entities.ProgramContext;
using Domain.Entities.References;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTO.Reviews
{
    public class GetReviewResponseDTO
    {
        public Guid Id { get; set; }
        public string Commentary { get; set; } = string.Empty;
        public ProgramVersionDTO? ProgramVersion { get; set; }
        public bool IsFinished { get; set; } = false;
        public bool IsSuccess { get; set; } = false;
        public EduProgramShortDTO?  Program { get; set; }

    }
}
