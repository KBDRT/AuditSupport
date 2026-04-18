using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Presentation.Contracts.User
{
    public record CreateUserRequest
    (
        string Surname,
        string Name,
        string Patronymic,
        string Login,
        [Required, EmailAddress] string Email,
        Roles Role,
        bool IsSendPassword
    );
}
