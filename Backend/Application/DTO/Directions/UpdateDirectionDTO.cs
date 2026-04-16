namespace Application.DTO.Directions
{
    public record UpdateDirectionDTO
    (
        Guid DirectionId,
        string Name,
        string ShortName,
        string Description
    );
}
