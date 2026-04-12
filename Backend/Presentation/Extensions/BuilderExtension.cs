using Application.Abstractions.Repositories;
using Application.Helpers;
using Application.Logic.Services.Definitions;
using Application.Logic.Services.Implementations;
using Domain.Entities;
using Infrastructure.Database;
using Infrastructure.Database.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Presentation.Auth;
using Presentation.Settings;
using System.Text;

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

            _services.Configure<AuthTokenSettings>(_configuration.GetSection("AuthenticationSettings"));

            _services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "AuditSupport",
                    Version = "v1",
                });
            });

            AddAuth();

            _services.AddControllers();
            _services.AddEndpointsApiExplorer();

            string? connectionDB = _configuration?.GetConnectionString("DefaultConnectionDataBase");

            _services.AddDbContext<AppDBContext>(options => options.UseNpgsql(connectionDB));

            _services.AddScoped<IBaseRepository<Direction>, BaseRepository<Direction>>();
            _services.AddScoped<IBaseRepository<EduYear>, BaseRepository<EduYear>>();

            _services.AddScoped<ServiceResult>();

            _services.AddScoped<IDirectionService, DirectionService>();
            _services.AddScoped<IEduYearService, EduYearService>();

            _services.AddScoped<JwtGenerator>();

        }

        private static void AddAuth()
        {
            var authSettings = _services.BuildServiceProvider().GetRequiredService<IOptions<AuthTokenSettings>>().Value;

            if (String.IsNullOrWhiteSpace(authSettings.SecretKey))
            {
                //Log.Fatal("No Secretkey for Authentication!");
                return;
            }

            _services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authSettings.SecretKey))
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies[authSettings.CookieNameForToken];

                        return Task.CompletedTask;
                    }
                };

            });

            _services.AddAuthorization(options =>
            {
                options.AddPolicy("RoleAdmin", policy => policy.Requirements.Add(new RoleRequirement("Admin")));
                //options.AddPolicy("RoleTeacher", policy => policy.Requirements.Add(new RoleRequirement("Teacher")));
                //options.AddPolicy("RoleHead", policy => policy.Requirements.Add(new RoleRequirement("Head")));
            });

        }
    }
}
