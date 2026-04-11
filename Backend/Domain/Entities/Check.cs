using Domain.Entities.Base;

namespace Domain.Entities
{
    public class Check : Identifier
    {
        public ProgramVersion Program { get; set; } = null!;

        public User Auditor { get; set; } = null!;

        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;

        public string Commentary { get; set; } = string.Empty;

        public bool IsSuccess { get; set; } = false;

        public List<Check> Checks { get; set; } = [];

    }
}
