using Application.Abstractions.Repositories;
using Application.Helpers;
using Application.Logic.Services.Definitions;
using Application.Logic.Services.Implementations;
using Domain.Entities;
using Infrastructure.Database;
using Infrastructure.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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

            _services.AddControllers();
            _services.AddEndpointsApiExplorer();

            string? connectionDB = _configuration?.GetConnectionString("DefaultConnectionDataBase");

            _services.AddDbContext<AppDBContext>(options => options.UseNpgsql(connectionDB));

            _services.AddScoped<IBaseRepository<Direction>, BaseRepository<Direction>>();
            _services.AddScoped<ServiceResult>();

            _services.AddScoped<IDirectionService, DirectionService>();

        }
    }
}
