using Application.DTO.Programs;

namespace Application.Abstractions.Files
{
    public interface IProgramFileParser
    {
        ProgramFileStructure ParseFile(Stream fileStream);
    }
}
