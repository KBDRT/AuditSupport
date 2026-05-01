namespace Application.DTO.Programs
{
    public record GetProgramFileResponseDTO
    (
        Stream FileStream,
        string FileName
    );
}
