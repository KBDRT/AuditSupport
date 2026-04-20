using Application.Common;
using Application.DTO.Common;
using Application.DTO.Rules;
using CSharpFunctionalExtensions;
using Domain.Entities.Base;

namespace Application.Services.Definitions
{
    public interface IRuleService<in T> where T : Identifier
    {
        public Task<Result<CreateOperationResponseDTO, ServiceError>> CreateRule(CreateRuleDTO dto, CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> DeleteRule(Guid ruleId, CancellationToken cancellationToken);

        public Task<Result<List<GetRuleResponseDTO>, ServiceError>> GetRules(CancellationToken cancellationToken);

        public Task<UnitResult<ServiceError>> UpdateRule(UpdateRuleDTO dto, CancellationToken cancellationToken);
    }
}
