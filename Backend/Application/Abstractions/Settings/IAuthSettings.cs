namespace Application.Abstractions.Settings
{
    public interface IAuthTokenSettings
    {
        string SecretKey { get; }
        TimeSpan TokenLifeTime { get; }
    }
}
