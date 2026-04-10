using Microsoft.OpenApi;

namespace Presentation.Extensions
{
    public static class BuilderExtension
    {
        private static IServiceCollection _services = null!;
        private static IConfiguration _configuration = null!;
        private static ILogger<Program> _logger = null!;

        public static void Configure(this IServiceCollection services, IConfiguration configuration)
        {
            _services = services;
            _configuration = configuration;
            _logger = services.BuildServiceProvider()?.GetService<ILogger<Program>>();

            _services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "AuditSupport",
                    Version = "v1",
                });
            });

        }
    }
}
