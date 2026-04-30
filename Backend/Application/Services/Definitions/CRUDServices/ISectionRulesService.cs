using Application.Common;
using Application.DTO.Common;
using Application.DTO.Rules;
using CSharpFunctionalExtensions;

namespace Application.Services.Definitions.CRUDServices
{
    public interface ISectionRulesService
    {
        public Task<Result<CreateOperationResponseDTO, ServiceError>> CreateRule(CreateSectionRuleDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> DeleteRule(Guid ruleId, CancellationToken cancellationToken);

        public Task<Result<List<GetSectionRuleResponseDTO>, ServiceError>> GetRules(CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> UpdateRule(UpdateSectionRuleDTO dto, CancellationToken cancellationToken);
    }
}
