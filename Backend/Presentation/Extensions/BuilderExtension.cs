using Application.Abstractions.Files;
using Application.Abstractions.Notifications;
using Application.Abstractions.Repositories;
using Application.Abstractions.Repositories.Builders;
using Application.Abstractions.Settings;
using Application.Features.Programs.Commands.Create;
using Application.Helpers;
using Application.Services.Definitions;
using Application.Services.Implementations;
using Domain.Entities;
using Infrastructure.Database;
using Infrastructure.Database.Repositories;
using Infrastructure.Database.Repositories.Builders;
using Infrastructure.Files;
using Infrastructure.Notifications;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Minio;
using Presentation.Auth;
using Presentation.MappingProfiles;
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
            _services.Configure<MinioSettings>(_configuration.GetSection("MinioS3"));

            _services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy =>
                    {
                        policy.AllowAnyOrigin()
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            


            _services.AddSwaggerGen(c =>
            {
                c.EnableAnnotations();

                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "AuditSupport",
                    Version = "v1",
                });
            });

            AddAuth();
            AddMinio();

            _services.AddControllers();
            _services.AddEndpointsApiExplorer();

            string? connectionDB = _configuration?.GetConnectionString("DefaultConnectionDataBase");

            _services.AddDbContext<AppDBContext>(options => options.UseNpgsql(connectionDB));

            _services.AddScoped<IBaseRepository<Direction>, BaseRepository<Direction>>();
            _services.AddScoped<IBaseRepository<EduYear>, BaseRepository<EduYear>>();
            _services.AddScoped<IBaseRepository<User>, BaseRepository<User>>();
            _services.AddScoped<IBaseRepository<ProgramVersion>, BaseRepository<ProgramVersion>>();
            _services.AddScoped<IBaseRepository<EduProgram>, BaseRepository<EduProgram>>();
            _services.AddScoped<IBaseRepository<ProgramReview>, BaseRepository<ProgramReview>>();
            _services.AddScoped<IBaseRepository<ProgramHistory>, BaseRepository<ProgramHistory>>();
            _services.AddScoped<IBaseRepository<RuleSection>, BaseRepository<RuleSection>>();
            _services.AddScoped<IBaseRepository<RuleWord>, BaseRepository<RuleWord>>();

            _services.AddScoped<IUserRepository, UserRepository>();


            _services.AddScoped<IDirectionService, DirectionService>();
            _services.AddScoped<IEduYearService, EduYearService>();
            _services.AddScoped<IAdminService, AdminService>();
            _services.AddScoped<IAuthService, AuthService>();

            _services.AddScoped<IMinioService, MinioService>();
            _services.AddScoped<IRuleService<RuleSection>, RuleService<RuleSection>>();
            _services.AddScoped<IRuleService<RuleWord>, RuleService<RuleWord>>();

            _services.AddScoped<JwtGenerator>();

            _services.AddSingleton<IAuthTokenSettings>(provider =>
            {
                var options = provider.GetRequiredService<IOptions<AuthTokenSettings>>();
                return options.Value;  
            });

            _services.AddSingleton<IMinioSettings>(provider =>
            {
                var options = provider.GetRequiredService<IOptions<MinioSettings>>();
                return options.Value;
            });


            _services.AddAutoMapper(cfg => { }, typeof(RequestsProfile));
            _services.AddAutoMapper(cfg => { }, typeof(Application.MappingProfiles.UserProfile));


            _services.AddScoped<INotification, EmailService>();
            _services.AddScoped<IProgramQueryBuilder, ProgramQueryBuilder>();
            _services.AddScoped<IProgramRepository, ProgramRepository>();
            _services.AddScoped<IProgramVersionRepository, ProgramVersionRepository>();
            _services.AddScoped<IProgramHistoryRepository, ProgramHistoryRepository>();

            _services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateProgramCommand).Assembly));

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



        private static void AddMinio()
        {
            string? connectionMinio = _configuration?.GetConnectionString("DefaultConnectionMinio");

            if (String.IsNullOrWhiteSpace(connectionMinio))
            {
                //Log.Fatal("Minio is not working! No connection string");
                return;
            }

            var minioSettings = _services.BuildServiceProvider().GetRequiredService<IOptions<MinioSettings>>().Value;
            _services.AddMinio(configureClient => configureClient
            .WithEndpoint(connectionMinio)
            .WithCredentials(minioSettings.Login, minioSettings.Password)
            .WithSSL(false)
            .Build());
        }
    }
}
