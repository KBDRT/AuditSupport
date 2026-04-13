namespace Application.Abstractions.Files
{
    public interface IMinioService
    {
        public Task<Stream> GetFile(string fileNameInMinio);

        public Task PutFile(Stream fileStream, string fileName);


    }
}
