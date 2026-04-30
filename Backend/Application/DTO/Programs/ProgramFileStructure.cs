using System.Text;

namespace Application.DTO.Programs
{
    public class ProgramFileStructure
    {
        public List<SectionStucture> Sections { get; set; } = [];

        public StringBuilder FileText { get; set; } = new();

    }
}
