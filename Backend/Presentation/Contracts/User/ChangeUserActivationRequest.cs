namespace Presentation.Contracts.User
{
    public record ChangeUserActivationRequest
    (
        Guid UserId, 
        bool IsActive
    );
}
