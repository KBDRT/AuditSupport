namespace Presentation.Contracts.Direction
{
    public record UpdateDirectionRequest
    (
        Guid DirectionId,
        string Name,
        string Description
    );
}
