namespace Presentation.Contracts.Year
{
    public record UpdateYearRequest
    (
        Guid YearId,
        int StartYear,
        string Description
    );
}
