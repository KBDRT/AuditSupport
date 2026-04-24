using Domain.Entities.Base;
using Domain.Enums;
using Domain.Values;

namespace Domain.Entities.References
{

    public class User : Identifier
    {
        public PersonInitials Initials { get; set; } = new();

        public string Login { get; set; } = string.Empty;

        public string PasswordHashed { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public Roles Role { get; set; }

        public bool IsActive { get; set; } = true;

    }
}
