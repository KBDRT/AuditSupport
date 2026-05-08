using Domain.Entities.References;
using MimeKit;

namespace Application.Abstractions.Notifications
{
    public interface INotification
    {
        Task Notificate(MimeMessage message);
    }
}
