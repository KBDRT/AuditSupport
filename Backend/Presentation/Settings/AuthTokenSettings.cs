namespace Presentation.Settings
{
    public class AuthTokenSettings
    {
        public string SecretKey { get; set; } = string.Empty;

        public TimeSpan TokenLifeTime { get; set; }

        public string CookieNameForToken { get; set; } = string.Empty;
    }
}
