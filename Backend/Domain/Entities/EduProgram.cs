using Domain.Entities.Base;
using Domain.Values;

namespace Domain.Entities
{
    public class EduProgram : Identifier
    {
        public string Name { get; set; } = string.Empty;

        public string AgesOfChildrens { get; set; } = string.Empty;
        
        public double Duration { get; set; }

        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;


        public EduYear Years { get; set; } = null!;

        public Direction Directopn { get; set; } = null!;

        public User Teacher { get; set; } = null!;

        public ProgramStatuses ProgramStatuses { get; set; }

        public List<ProgramVersion> Versions { get; set; } = [];
    }
}
