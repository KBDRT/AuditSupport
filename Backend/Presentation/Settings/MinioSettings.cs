using Application.Abstractions.Settings;

namespace Presentation.Settings
{
    public class MinioSettings : IMinioSettings
    {
        public string Login { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string DefaultBucketName { get; set; } = string.Empty;
    }
}
