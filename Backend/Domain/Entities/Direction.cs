using Domain.Entities.Base;

namespace Domain.Entities
{
    public class Direction : Identifier
    {
        public string Name { get; set; } = string.Empty;    
        public string ShortName { get; set; }  = string.Empty;
        public string Description { get; set; } = string.Empty;

        public List<EduProgram> Programs = [];

    }
}
