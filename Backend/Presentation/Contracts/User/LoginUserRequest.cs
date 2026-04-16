namespace Presentation.Contracts.User
{
    public record LoginUserRequest
    (
        string Login, 
        string Password
    );
}
