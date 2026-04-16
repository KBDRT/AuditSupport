namespace Application.Common
{
    public enum ErrorsCode
    {
        NOT_FOUND,
        EXISTING_RECORD,
        INCORRECT_PARAMETERS,
        UNKNOWN_ERROR
    };


    public class ServiceError
    {
        public ErrorsCode Code { get; set; } 

        public string Message { get; set; } = string.Empty;

        public DateTime Timestamp { get; } = DateTime.Now;

        public ServiceError(ErrorsCode code, string message)
        {
            Code = code;
            Message = message;
        }

    }
}
