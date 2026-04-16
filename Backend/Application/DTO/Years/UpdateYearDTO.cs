using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.DTO.Years
{
    public record UpdateYearDTO
    (
        Guid YearId,
        int StartYear,
        string Description
    );
}
