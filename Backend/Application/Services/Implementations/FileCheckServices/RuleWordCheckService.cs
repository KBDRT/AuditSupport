using Application.Abstractions.Repositories;
using Application.DTO.Programs;
using Application.Services.Definitions.FileCheckServices;
using Domain.Entities.ProgramContext;
using Domain.Entities.Rules;

namespace Application.Services.Implementations.FileCheckServices
{
    public class RuleWordCheckService : IRuleWordCheckService
    {
        private readonly IBaseRepository<RuleWord> _repository;

        public RuleWordCheckService(IBaseRepository<RuleWord> repository)
        {
            _repository = repository;
        }

        public async Task<List<CheckError>> CheckProgramWords(ProgramFileStructure structure, CancellationToken cancellationToken)
        {
            List<CheckError> result = [];
            var wordsRules = await _repository.GetAll(cancellationToken);
            string text = structure.FileText.ToString();
            string[] words = text.Split(" ");


            if (wordsRules != null)
            {
                foreach (var wordRule in wordsRules)
                {
                    int index = -1;

                    var all = words.Where(x => x.Contains(wordRule.Word));

                    foreach (var item in all)
                    {
                        //    int startIndex = index - 100;
                        //    startIndex = startIndex < 0 ? 0 : startIndex;

                        //    int contextLength = 200;
                        //    contextLength = contextLength > text.Length ? text.Length - startIndex : contextLength;

                        //    var section = structure.Sections.LastOrDefault(s => s.Position <= index) ?? structure.Sections.FirstOrDefault(); 

                        result.Add(new()
                        {
                            //Context = text.Substring(startIndex, contextLength).Trim(),
                            RuleSourceId = wordRule.Id,
                            WordLength = wordRule.Word.Length,
                            Message = "Слово найдено",
                            RuleType = Domain.Enums.RuleType.Word,
                            Rule = wordRule.Word,
                            //SectionName = section?.SectionName ?? "",
                            //PageNumber = section?.PageNumber ?? 0
                        });
                    }

                    //while ((index = text.IndexOf(wordRule.Word, index + 1, StringComparison.OrdinalIgnoreCase)) != -1)
                    //{
                    //    int startIndex = index - 100;
                    //    startIndex = startIndex < 0 ? 0 : startIndex;

                    //    int contextLength = 200;
                    //    contextLength = contextLength > text.Length ? text.Length - startIndex : contextLength;

                    //    var section = structure.Sections.LastOrDefault(s => s.Position <= index) ?? structure.Sections.FirstOrDefault(); 

                    //    result.Add(new()
                    //    {
                    //        Context = text.Substring(startIndex, contextLength).Trim(),
                    //        RuleSourceId = wordRule.Id,
                    //        WordLength = wordRule.Word.Length,
                    //        Message = "Слово найдено",
                    //        RuleType = Domain.Enums.RuleType.Word,
                    //        Rule = wordRule.Word,
                    //        SectionName = section?.SectionName ?? "",
                    //        PageNumber = section?.PageNumber ?? 0
                    //    });
                    //}
                }
            }

            return result;
        }
    }
}
