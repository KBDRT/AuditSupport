using Application.Abstractions.Repositories;
using Application.DTO.Rules;
using Domain.Entities.References;
using Domain.Entities.Rules;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Infrastructure.Database.Repositories
{
    public class SectionRuleRepository(AppDBContext context) : BaseRepository<RuleSection>(context), ISectionRuleRepository
    {
        public async Task<RuleSection?> GetByIdWithStructure(Guid ruleId, CancellationToken cancellationToken = default)
        {
            return await _context.RuleSections.Include(x => x.Structure).FirstOrDefaultAsync(x => x.Id == ruleId, cancellationToken);
        }

        public async Task<List<RuleSection>?> GetRules(CancellationToken cancellationToken = default)
        {
            return await _context.RuleSections.Include(x => x.Structure).ToListAsync(cancellationToken);
        }

        public async Task UpdateDeep(RuleSection section, CancellationToken cancellationToken = default)
        {
            var existingStructures = await _context.RuleStructures
           .Where(s => s.SectionId == section.Id)
           .ToListAsync(cancellationToken);

            _context.RuleStructures.RemoveRange(existingStructures);

            foreach (var structure in section.Structure)
            {
                structure.Id = Guid.NewGuid();
                _context.RuleStructures.Add(structure);
            }

            _context.RuleSections.Update(section);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
