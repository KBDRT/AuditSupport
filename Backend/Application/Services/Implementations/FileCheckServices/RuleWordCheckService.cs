using Application.Abstractions.Files;
using Application.Abstractions.Repositories;
using Application.DTO.Programs;
using Application.Services.Definitions.FileCheckServices;
using DocumentFormat.OpenXml.Office2021.Excel.NamedSheetViews;
using Domain.Entities.ProgramContext;
using Domain.Entities.Rules;


namespace Application.Services.Implementations.FileCheckServices
{
    public class RuleWordCheckService : IRuleWordCheckService
    {
        private readonly IBaseRepository<RuleWord> _repository;
        private readonly INHunspellService _hunspell;

        public RuleWordCheckService(IBaseRepository<RuleWord> repository, INHunspellService hunspell)
        {
            _repository = repository;
            _hunspell = hunspell;
        }

        public async Task<List<CheckError>> CheckProgramWords(ProgramFileStructure structure, CancellationToken cancellationToken)
        {
            List<CheckError> result = [];
            var wordsRules = await _repository.GetAll(cancellationToken);
            string text = structure.FileText.ToString();
            string[] words = text.Split(new[] { ' ', '\n', '\r', '.', ',', ';', '!', '?' }, StringSplitOptions.RemoveEmptyEntries);


            if (wordsRules != null)
            {
                foreach (var wordRule in wordsRules)
                {
                    var test = _hunspell.SpellCheck(wordRule.Word);
                    var test1 = _hunspell.GetSuggestions(wordRule.Word);
                    var test2 = _hunspell.GetStems(wordRule.Word);

                    for (int i = 0; i < words.Length; i++)
                    {
                        if (IsIllegal(wordRule.Word, words[i]))
                        {
                            int startIndex = Math.Max(0, i - 10);
                            int endIndex = Math.Min(words.Length - 1, i + 10);

                            // Собираем контекст
                            var contextWords = new List<string>();
                            for (int j = startIndex; j <= endIndex; j++)
                            {
                                if (j == i)
                                    contextWords.Add($"[{words[j]}]"); 
                                else
                                    contextWords.Add(words[j]);
                            }

                            string context = string.Join(" ", contextWords);

                            //int charPosition = GetApproximatePosition(text, words, i);
                            //var section = structure.Sections.LastOrDefault(s => s.Position <= charPosition)
                            //              ?? structure.Sections.FirstOrDefault();

                            result.Add(new()
                            {
                                Context = context,
                                RuleSourceId = wordRule.Id,
                                WordLength = wordRule.Word.Length,
                                Message = "Найден нерекомендуемый термин",
                                RuleType = Domain.Enums.RuleType.Word,
                                Rule = wordRule.Word,
                                //SectionName = section?.SectionName ?? "",
                                //PageNumber = section?.PageNumber ?? 0
                            });
                        }

                        //int index = 0;

                        //var all = words.Where(x => x.Contains(wordRule.Word)).ToList();

                        //foreach (var item in all)
                        //{
                        //    //int startIndex = item. - 100;
                        //    //startIndex = startIndex < 0 ? 0 : startIndex;

                        //    //int contextLength = 200;
                        //    //contextLength = contextLength > text.Length ? text.Length - startIndex : contextLength;

                        //    //    var section = structure.Sections.LastOrDefault(s => s.Position <= index) ?? structure.Sections.FirstOrDefault(); 

                        //    result.Add(new()
                        //    {
                        //        //Context = text.Substring(startIndex, contextLength).Trim(),
                        //        RuleSourceId = wordRule.Id,
                        //        WordLength = wordRule.Word.Length,
                        //        Message = "Слово найдено",
                        //        RuleType = Domain.Enums.RuleType.Word,
                        //        Rule = wordRule.Word,
                        //        //SectionName = section?.SectionName ?? "",
                        //        //PageNumber = section?.PageNumber ?? 0
                        //    });
                        //}

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
            }

            return result;
        }

        private bool IsIllegal(string rule, string word)
        {

            if (string.IsNullOrEmpty(word) || string.IsNullOrEmpty(rule)) return false;

            if (string.Equals(word, rule, StringComparison.OrdinalIgnoreCase)) return true;

            if (rule.EndsWith("*") && !rule.StartsWith("*"))
            {
                string prefix = rule.TrimEnd('*');
                return word.StartsWith(prefix, StringComparison.OrdinalIgnoreCase);
            }

            if (rule.StartsWith("*") && !rule.EndsWith("*"))
            {
                string suffix = rule.TrimStart('*');
                return word.EndsWith(suffix, StringComparison.OrdinalIgnoreCase);
            }

            if (rule.StartsWith("*") && rule.EndsWith("*"))
            {
                string contains = rule.Trim('*');
                return word.Contains(contains, StringComparison.OrdinalIgnoreCase);
            }


            //words[i].Contains(wordRule.Word, StringComparison.OrdinalIgnoreCase)

            return false;
        }


    }
}
