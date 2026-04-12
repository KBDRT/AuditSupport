using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Presentation.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Presentation.Auth
{
    public class JwtGenerator
    {
        private readonly IOptions<AuthTokenSettings> _settings;

        public JwtGenerator(IOptions<AuthTokenSettings> settings)
        {
            _settings = settings;
        }

        public string GetNewJwtTokenString(List<Claim> claims)
        {

            var key = _settings.Value.SecretKey;
            var jwtToken = new JwtSecurityToken(
                expires: DateTime.UtcNow.Add(_settings.Value.TokenLifeTime),
                claims: claims,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256
                ));

            var jwtTokenString = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return jwtTokenString;
        }
    }
}
