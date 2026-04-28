namespace Application.DTO.Programs
{
    public record ShortYearDTO
    (
        Guid Id,
        string Period,
        bool IsOpened,
        List<ShortProgramDTO> Programs
    );
}
