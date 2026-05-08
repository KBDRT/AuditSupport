using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTO.Common
{
    public record MimeMessageInfo
    (
        string Message,
        string Subject,
        string SenderName
    );
}
