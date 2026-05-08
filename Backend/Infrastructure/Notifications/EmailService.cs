using Application.Abstractions.Notifications;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Infrastructure.Notifications
{
    public class EmailService : INotification
    {
        private readonly IConfiguration _config;

        private string _account;
        private string _password;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        private void Configurate()
        {
            _account = _config["EmailAccount"] ?? string.Empty;
            _password = _config["EmailPassword"] ?? string.Empty;

            if (String.IsNullOrWhiteSpace(_account) || String.IsNullOrWhiteSpace(_password))
            {
                throw new Exception();
            }
        }

        public async Task Notificate(MimeMessage mimeMessage)
        {
            Configurate();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.yandex.ru", 465, true);
                await client.AuthenticateAsync(_account, _password);
                await client.SendAsync(mimeMessage);
                await client.DisconnectAsync(true);
            }
        }
    }
}
