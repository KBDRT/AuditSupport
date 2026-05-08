namespace Presentation.Extensions
{
    public static class ApplicationExtension
    {
        public static void Configure(this WebApplication app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                options.RoutePrefix = string.Empty;
            });

            app.UseCors("AllowReactApp");

            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseCookiePolicy(new CookiePolicyOptions
            //{
            //    MinimumSameSitePolicy = SameSiteMode.Strict,
            //    HttpOnly = HttpOnlyPolicy.Always,
            //    Secure = CookieSecurePolicy.Always
            //});

            app.UseHttpsRedirection();

            app.UseRouting();

            //app.UseMiddleware<AuthMiddleware>();

            app.MapControllers();

        }
    }
}
