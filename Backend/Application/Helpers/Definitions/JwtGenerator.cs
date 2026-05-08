using Application.Abstractions.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Application.Helpers.Definitions
{
    public class JwtGenerator
    {
        private readonly IAuthTokenSettings _settings;

        public JwtGenerator(IAuthTokenSettings settings)
        {
            _settings = settings;
        }

        public string GetNewJwtTokenString(List<Claim> claims)
        {

            var key = _settings.SecretKey;
            var jwtToken = new JwtSecurityToken(
                expires: DateTime.UtcNow.Add(_settings.TokenLifeTime),
                claims: claims,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256
                ));

            var jwtTokenString = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return jwtTokenString;
        }
    }
}
