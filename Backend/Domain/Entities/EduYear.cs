using Domain.Entities.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class EduYear : Identifier
    {
        [MaxLength(4)]
        public int StartYear { get; set; }

        [MaxLength(4)]
        public int EndYear { get; set; }

        public string Description { get; set; } = string.Empty;

        [NotMapped]
        public string Period
        { get
            {
                return $"{StartYear}-{EndYear}";
            } 
        }

        public bool IsOpened { get; set; } = false;

        public List<EduProgram> Programs = [];

    }
}
