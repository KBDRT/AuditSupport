namespace Application.DTO.Users
{
    public record LoginUserResponseDTO
    (
        string Token,
        string UserId,
        string Role,
        string UserName,
        string Login
    );
}
