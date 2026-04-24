using Domain.Entities.References;

namespace Application.Abstractions.Notifications
{
    public interface INotification
    {
        Task Notificate(User user, string message, string subject);
    }
}
