using Application.DTO.Common;
using MimeKit;

namespace Application.Helpers.Abstractions
{
    public interface IMimeHelper
    {
        MimeMessage CreateMessage(List<string> emails, MimeMessageInfo info);
    }
}
