using Application.DTO.Rules;
using Domain.Entities.Rules;

namespace Application.Abstractions.Repositories
{
    public interface ISectionRuleRepository : IBaseRepository<RuleSection>
    {
        public Task<List<RuleSection>?> GetRules(CancellationToken cancellationToken = default);

        public Task<RuleSection?> GetByIdWithStructure(Guid ruleId, CancellationToken cancellationToken = default);

        public Task UpdateDeep(RuleSection section, CancellationToken cancellationToken = default);
    }
}
