using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Users;
using Application.Helpers;
using Application.Services.Definitions;
using CSharpFunctionalExtensions;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Application.Services.Implementations
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


        public async Task<Result<string, ServiceError>> LoginUser(LoginUserDTO dto, CancellationToken cancellationToken)
        {
            var user = await _repository.GetByLogin(dto.Login, cancellationToken);
            if (user != null)
            {
                var verifiedResult = new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHashed, dto.Password);
                if (verifiedResult == PasswordVerificationResult.Success)
                {
                    var claims = CreateClaimForUser(user);
                    var token = _tokenGenerator.GetNewJwtTokenString(claims);
                    return Result.Success<string, ServiceError>(token);
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

            return Result.Failure<string, ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
        }

        private List<Claim> CreateClaimForUser(User user)
        {
            return
            [
                new Claim("user", user.Id.ToString()),
            ];
        }

    }
}
