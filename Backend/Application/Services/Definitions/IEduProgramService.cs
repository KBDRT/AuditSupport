namespace Application.Services.Definitions
{
    public interface IEduProgramService
    {
        public Task CreateProgram();

        public Task CreateVersion();

        public Task ChangeStatus();

    }
}
