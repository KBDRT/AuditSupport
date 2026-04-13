using Domain.Enums;

namespace Application.DTO
{
    public record CreateUserDTO
    (
        string Surname,
        string Name,
        string Patronymic,
        string Login,
        string Email,
        Roles Role
    );
}
