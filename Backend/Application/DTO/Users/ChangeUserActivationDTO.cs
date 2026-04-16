namespace Application.DTO.Users
{
    public record ChangeUserActivationDTO
    (
        Guid UserId,
        bool IsActive
    );
}
