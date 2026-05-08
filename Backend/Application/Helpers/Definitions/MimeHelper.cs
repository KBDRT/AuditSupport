using Application.DTO.Common;
using Application.Helpers.Abstractions;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Application.Helpers.Definitions
{
    public class MimeHelper : IMimeHelper
    {
        private readonly IConfiguration _config;

        private string _account = null!;
        private string _emailDefault = null!;

        public MimeHelper(IConfiguration config)
        {
            _config = config;

            Configurate();
        }

        private void Configurate()
        {
            _account = _config["EmailAccount"] ?? string.Empty;
            _emailDefault = _config["EmailDefault"] ?? string.Empty;

            if (String.IsNullOrWhiteSpace(_account) || String.IsNullOrWhiteSpace(_emailDefault))
            {
                throw new Exception();
            }
        }

        public MimeMessage CreateMessage(List<string> emails, MimeMessageInfo info)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(info.SenderName, _account));
            foreach (var email in emails)
            {
                message.To.Add(new MailboxAddress("", _emailDefault));
            }
            message.Subject = info.Subject;
            message.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = info.Message
            };

            return message;
        }

    }
}
