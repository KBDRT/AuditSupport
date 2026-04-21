namespace Application.DTO.Years
{
    public record ChangeYearStatusDTO
    (
        Guid YearId, 
        bool IsOpenYear,
        bool IsNotificateUsers
    );
}
