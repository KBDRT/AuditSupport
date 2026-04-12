using CSharpFunctionalExtensions;

namespace Application.Helpers
{
    public record Info(string Message, string Code = "", string Field = "");

    public class ServiceResult
    {
        public int StatusCode { get; private set; } = 0;

        public List<Info> Messages { get; private set; } = [];

        public Result Result { get; private set; } = Result.Failure("Error");

        public void AddMessage(string message, string code = "", string field = "")
        {
            Info newMessage = new(message, code, field);
            Messages.Add(newMessage);
        }

        public void SetStatusCode(int code) => StatusCode = code;
    }
}
