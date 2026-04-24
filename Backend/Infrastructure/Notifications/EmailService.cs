using Application.Abstractions.Notifications;
using Domain.Entities.References;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Infrastructure.Notifications
{
    public class EmailService : INotification
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task Notificate(User user, string message, string subject)
        {
            using var emailMessage = new MimeMessage();

            var acc = _config["EmailAccount"];
            var password = _config["EmailPassword"];

            emailMessage.From.Add(new MailboxAddress("Аудит", acc));
            emailMessage.To.Add(new MailboxAddress("", user.Email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.yandex.ru", 465, true);
                await client.AuthenticateAsync(acc, password);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
