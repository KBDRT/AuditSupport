using Domain.Enums;

namespace Presentation.Contracts.User
{
   public record UpdateUserRequest
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
