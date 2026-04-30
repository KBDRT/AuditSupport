using Application.Common;
using Application.DTO.Common;
using Application.DTO.Rules;
using CSharpFunctionalExtensions;

namespace Application.Services.Definitions.CRUDServices
{
    public interface IWordRulesService
    {
        public Task<Result<CreateOperationResponseDTO, ServiceError>> CreateRule(CreateWordRuleDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> DeleteRule(Guid ruleId, CancellationToken cancellationToken);

        public Task<Result<List<GetWordRuleResponseDTO>, ServiceError>> GetRules(CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> UpdateRule(UpdateWordRuleDTO dto, CancellationToken cancellationToken);
    }
}
