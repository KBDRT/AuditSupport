using System.Security.Cryptography;

namespace Application.Helpers.Definitions
{
    public static class PasswordGenerator
    {
        public static string GeneratePassword(int length = 12, bool includeSpecialChars = true)
        {
            const string letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string digits = "0123456789";
            const string specials = "!@#$%^&*()_-+=<>?";

            string chars = letters + digits;
            if (includeSpecialChars) chars += specials;

            return GenerateRandomString(chars, length);
        }

        private static string GenerateRandomString(string chars, int length)
        {
            char[] result = new char[length];
            byte[] randomBytes = new byte[length];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
            }

            for (int i = 0; i < length; i++)
            {
                result[i] = chars[randomBytes[i] % chars.Length];
            }

            return new string(result);
        }
    }
}
