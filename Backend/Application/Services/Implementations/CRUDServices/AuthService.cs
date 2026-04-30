using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Users;
using Application.Helpers;
using Application.Services.Definitions.CRUDServices;
using CSharpFunctionalExtensions;
using Domain.Entities.References;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Application.Services.Implementations.CRUDServices
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repository;
        private readonly JwtGenerator _tokenGenerator;

        public AuthService(IUserRepository repository,
                           JwtGenerator generator)
        {
            _repository = repository;
            _tokenGenerator = generator;
        }


        public async Task<Result<LoginUserResponseDTO, ServiceError>> LoginUser(LoginUserDTO dto, CancellationToken cancellationToken)
        {
            var user = await _repository.GetByLogin(dto.Login, cancellationToken);
            if (user != null)
            {
                var verifiedResult = new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHashed, dto.Password);
                if (verifiedResult == PasswordVerificationResult.Success)
                {
                    var claims = CreateClaimForUser(user);
                    var token = _tokenGenerator.GetNewJwtTokenString(claims);
                    return Result.Success<LoginUserResponseDTO, ServiceError>(new(token, user.Id.ToString(), user.Role.ToString(), user.Initials.Short, user.Login));
                }
                else
                {
                    //result.AddMessage("Неправильный пароль!", "Password");
                }
            }
            else
            {
                //result.AddMessage("Пользователь не найден!", "Login");
            }

            return Result.Failure<LoginUserResponseDTO, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
        }

        private List<Claim> CreateClaimForUser(User user)
        {
            return
            [
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(ClaimTypes.Name, user.Initials.Short),
                new Claim(ClaimTypes.GivenName, user.Login)
            ];
        }

    }
}
