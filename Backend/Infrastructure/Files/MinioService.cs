using Application.Abstractions.Files;
using Application.Abstractions.Settings;
using Minio;
using Minio.DataModel.Args;

namespace Infrastructure.Files
{

    public class MinioService : IMinioService
    {
        private readonly IMinioClient _minioClient;
        private readonly IMinioSettings _settings;

        private string _bucketName = string.Empty;

        public MinioService(IMinioClient minioClient,
                            IMinioSettings minioSettings)
        {
            _minioClient = minioClient;
            _settings = minioSettings;
            _bucketName = _settings.DefaultBucketName;
        }

        public void SetBucket(string bucketName) => _bucketName = bucketName;   

        public async Task<Stream> GetFile(string fileNameInMinio)
        {
            var memoryStream = new MemoryStream();
            try
            {
                var getObjectArgs = new GetObjectArgs()
                    .WithBucket(_bucketName)
                    .WithObject(fileNameInMinio)
                    .WithCallbackStream(stream =>
                    {
                        stream.CopyTo(memoryStream);
                        memoryStream.Position = 0;
                    });

                await _minioClient.GetObjectAsync(getObjectArgs);
            }
            catch
            {

            }
            return memoryStream;
        }


        public async Task PutFile(Stream fileStream, string fileName)
        {
            try
            {
                var args = new PutObjectArgs()
               .WithBucket(_bucketName)
               .WithObject(fileName)
               .WithContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document\"")
               .WithStreamData(fileStream)
               .WithObjectSize(fileStream.Length);

                fileStream.Position = 0;
                await _minioClient.PutObjectAsync(args).ConfigureAwait(false);
            }
            catch (Exception ex) 
            {
                throw new Exception("[MinioProblem]");
            }
        }
    }
}
