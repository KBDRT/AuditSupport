using Domain.Entities.Base;
using Domain.Entities.ProgramContext;

namespace Domain.Entities.References
{
    public class Direction : Identifier
    {
        public string Name { get; set; } = string.Empty;    
        public string? ShortName { get; set; }  = string.Empty;
        public string? Description { get; set; } = string.Empty;

        public List<ProgramVersion> Programs = [];

    }
}
