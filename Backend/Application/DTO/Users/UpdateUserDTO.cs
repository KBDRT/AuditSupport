using Domain.Enums;
using Domain.Values;

namespace Application.DTO.Users
{
    public record UpdateUserDTO
    (
        Guid UserId,
        string Surname,
        string Name,
        string Patronymic,
        string Email,
        Roles Role,
        bool IsActive
    );
}
