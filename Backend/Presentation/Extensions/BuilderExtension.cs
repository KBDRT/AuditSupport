using Application.Abstractions.Files;
using Application.Abstractions.Notifications;
using Application.Abstractions.Repositories;
using Application.Abstractions.Repositories.Builders;
using Application.Abstractions.Settings;
using Application.Features.Programs.Commands.Create;
using Application.Helpers;
using Application.MappingProfiles;
using Application.Services.Definitions.CRUDServices;
using Application.Services.Definitions.FileCheckServices;
using Application.Services.Implementations.CRUDServices;
using Application.Services.Implementations.FileCheckServices;
using Domain.Entities.ProgramContext;
using Domain.Entities.References;
using Domain.Entities.Rules;
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
                        policy.WithOrigins("https://localhost:5173")
                              .AllowCredentials()
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .WithExposedHeaders("X-File-Name");
                    });
            });


            //Response.Headers.Add("X-File-Name", encodedFileName);
            //Response.Headers.Add("Access-Control-Expose-Headers", "X-File-Name");


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

            AddRepositories();

            AddServices();

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
            _services.AddAutoMapper(cfg => { }, typeof(UserProfile));
            _services.AddAutoMapper(cfg => { }, typeof(ProgramProfile));
            

            _services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateProgramCommand).Assembly));

        }

        private static void AddServices()
        {
            _services.AddScoped<IDirectionService, DirectionService>();
            _services.AddScoped<IEduYearService, EduYearService>();
            _services.AddScoped<IAdminService, AdminService>();
            _services.AddScoped<IAuthService, AuthService>();
            _services.AddScoped<ISectionRulesService, SectionRulesService>();
            _services.AddScoped<IMinioService, MinioService>();
            _services.AddScoped<IWordRulesService, WordRulesService>();
            _services.AddScoped<INotification, EmailService>();
            _services.AddScoped<IProgramFileParser, ProgramFileWordParser>();

            _services.AddScoped<IProgramFileChecksService, ProgramFileChecksService>();
            _services.AddScoped<INHunspellService, NHunspellService>();

            _services.AddScoped<IRuleWordCheckService, RuleWordCheckService>();
            _services.AddScoped<IRuleSectionCheckService, RuleSectionCheckService>();

            _services.AddScoped<INHunspellService, NHunspellService>();
        }

        private static void AddRepositories()
        {
            _services.AddScoped<IBaseRepository<Direction>, BaseRepository<Direction>>();
            _services.AddScoped<IBaseRepository<EduYear>, BaseRepository<EduYear>>();
            _services.AddScoped<IBaseRepository<User>, BaseRepository<User>>();
            _services.AddScoped<IBaseRepository<ProgramVersion>, BaseRepository<ProgramVersion>>();
            _services.AddScoped<IBaseRepository<EduProgram>, BaseRepository<EduProgram>>();
            _services.AddScoped<IBaseRepository<ProgramReview>, BaseRepository<ProgramReview>>();
            _services.AddScoped<IBaseRepository<ProgramHistory>, BaseRepository<ProgramHistory>>();
            _services.AddScoped<IBaseRepository<RuleSection>, BaseRepository<RuleSection>>();
            _services.AddScoped<IBaseRepository<RuleWord>, BaseRepository<RuleWord>>();
            _services.AddScoped<IBaseRepository<TechCheck>, BaseRepository<TechCheck>>();

            _services.AddScoped<IUserRepository, UserRepository>();
            _services.AddScoped<IEduYearRepository, EduYearRepository>();
            _services.AddScoped<ICheckErrorRepository, CheckErrorRepository>();
            _services.AddScoped<ISectionRuleRepository, SectionRuleRepository>();
            _services.AddScoped<IProgramRepository, ProgramRepository>();
            _services.AddScoped<IProgramVersionRepository, ProgramVersionRepository>();
            _services.AddScoped<IProgramHistoryRepository, ProgramHistoryRepository>();

            _services.AddScoped<IProgramQueryBuilder, ProgramQueryBuilder>();
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
