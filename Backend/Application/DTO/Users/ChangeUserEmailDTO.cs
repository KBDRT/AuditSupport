namespace Application.DTO.Users
{
    public record ChangeUserEmailDTO
    (
        Guid UserId,
        string NewEmail
    );
}
