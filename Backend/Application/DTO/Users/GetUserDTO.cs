using Domain.Enums;
using Domain.Values;

namespace Application.DTO.Users
{
    public record GetUserDTO
    (
        Guid Id,
        PersonInitials Initials,
        string Login,
        string Email,
        Roles Role,
        bool IsActive
    );
}
