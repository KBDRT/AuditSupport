namespace Application.Logic.Services.Definitions
{
    public interface IAdminService
    {
        public Task CreateUser();

        public Task DeleteUser();

        public Task DeactivateUser();
        
    }
}
