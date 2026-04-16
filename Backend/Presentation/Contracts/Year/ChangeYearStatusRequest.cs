namespace Presentation.Contracts.Year
{
    public record ChangeYearStatusRequest
    (
        Guid YearId,
        bool IsOpenYear
    );
}
