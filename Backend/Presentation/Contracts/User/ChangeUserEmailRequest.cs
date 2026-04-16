using System.ComponentModel.DataAnnotations;

namespace Presentation.Contracts.User
{
    public record ChangeUserEmailRequest
    (
        Guid UserId, 
        [EmailAddress] string NewEmail
    );
}
