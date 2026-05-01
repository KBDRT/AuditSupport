using Application.Abstractions.Files;
using Application.Abstractions.Repositories;
using Application.DTO.Programs;
using Application.Services.Definitions.FileCheckServices;
using DocumentFormat.OpenXml.Office2021.Excel.NamedSheetViews;
using Domain.Entities.ProgramContext;
using Domain.Entities.Rules;
using System.Text.RegularExpressions;


namespace Application.Services.Implementations.FileCheckServices
{
    public class RuleSectionCheckService : IRuleSectionCheckService
    {
        private readonly IBaseRepository<RuleSection> _repository;

        public RuleSectionCheckService(IBaseRepository<RuleSection> repository)
        {
            _repository = repository;
        }

        public async Task<List<CheckError>> CheckProgramSections(ProgramFileStructure structure, CancellationToken cancellationToken)
        {
            List<CheckError> result = [];
            var sectionsRules = await _repository.GetAll(cancellationToken);

            if (sectionsRules != null)
            {
                foreach (var sectionsRule in sectionsRules)
                {
                    var index = structure.FileText.ToString().IndexOf(sectionsRule.SectionName);
                    bool isFounded = structure.Sections.Any(section => IsMatch(section.SectionName, sectionsRule.SectionName));
                    if (!isFounded)
                    {
                        result.Add(new()
                        {
                            //Context = text.Substring(startIndex, 100).Trim(),
                            RuleSourceId = sectionsRule.Id,
                            //WordLength = wordRule.Word.Length,
                            Message = "Раздел не найден",
                            RuleType = Domain.Enums.RuleType.Section,
                            Rule = sectionsRule.SectionName,
                        });
                    }
                    else
                    {
                        var section = structure.Sections.FirstOrDefault(x => x.SectionName.StartsWith(sectionsRule.SectionName));

                        if (section != null)
                        {
                            section.Position = index;
                        }
                    }
                }
            }

            return result;
        }

        private bool IsMatch(string sectionName, string pattern)
        {
            if (string.IsNullOrEmpty(sectionName) || string.IsNullOrEmpty(pattern)) return false;

            if (string.Equals(sectionName, pattern, StringComparison.OrdinalIgnoreCase)) return true;

            if (pattern.EndsWith("*") && !pattern.StartsWith("*"))
            {
                string prefix = pattern.TrimEnd('*');
                return sectionName.StartsWith(prefix, StringComparison.OrdinalIgnoreCase);
            }

            if (pattern.StartsWith("*") && !pattern.EndsWith("*"))
            {
                string suffix = pattern.TrimStart('*');
                return sectionName.EndsWith(suffix, StringComparison.OrdinalIgnoreCase);
            }

            if (pattern.StartsWith("*") && pattern.EndsWith("*"))
            {
                string contains = pattern.Trim('*');
                return sectionName.Contains(contains, StringComparison.OrdinalIgnoreCase);
            }

            return false;
        }

    }
}
