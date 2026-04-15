namespace Presentation.Contracts.EduPrograms
{
    public record CreateVersionRequest
    (
        Guid ProgramId,
        string Changes,
        IFormFile File
    );

}
