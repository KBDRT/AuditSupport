using Domain.Entities.ProgramContext;
using Domain.Entities.References;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTO.Reviews
{
    public class ShortReviewResponseDTO
    {
        public Guid Id { get; set; }

        public string Auditor { get; set; } = null!;

        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;

        public bool IsFinished { get; set; } = false;

        public bool IsSuccess { get; set; } = false;
    }
}
