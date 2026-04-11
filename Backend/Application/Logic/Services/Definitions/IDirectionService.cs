using CSharpFunctionalExtensions;

namespace Application.Logic.Services.Definitions
{
    internal interface IDirectionService
    {
        public Task<Result<Guid>> Create(string name, string shortName, string description);

        public Task Delete();

        public Task Get();

        public Task Update();
    }
}
