using Application.Abstractions.Settings;

namespace Presentation.Settings
{
    public class AuthTokenSettings : IAuthTokenSettings
    {
        public string SecretKey { get; set; } = string.Empty;

        public TimeSpan TokenLifeTime { get; set; }

        public string CookieNameForToken { get; set; } = string.Empty;
    }
}
