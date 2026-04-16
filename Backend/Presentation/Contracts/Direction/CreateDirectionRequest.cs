namespace Presentation.Contracts.Direction
{
    public record CreateDirectionRequest
    (
        string Name, 
        string? ShortName, 
        string? Description
    );
}
