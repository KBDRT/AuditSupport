namespace Application.Abstractions.Settings
{
    public interface IMinioSettings
    {
        string Login { get; }

        string Password { get; }

        string DefaultBucketName { get; }
    }
}
