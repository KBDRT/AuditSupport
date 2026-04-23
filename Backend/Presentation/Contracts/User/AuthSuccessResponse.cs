namespace Presentation.Contracts.User
{
    public record AuthSuccessResponse
    (
        string UserId,
        string Role
    );
}
