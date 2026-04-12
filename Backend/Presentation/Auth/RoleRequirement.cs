using Microsoft.AspNetCore.Authorization;

namespace Presentation.Auth
{
    public class RoleRequirement : IAuthorizationRequirement
    {
        public string RoleName { get; set; } = string.Empty;

        public RoleRequirement(string roleName) => RoleName = roleName;
    }
}
