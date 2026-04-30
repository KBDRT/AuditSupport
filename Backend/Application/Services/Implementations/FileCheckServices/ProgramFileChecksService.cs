using Application.Abstractions.Files;
using Application.Common;
using Application.Services.Definitions.FileCheckServices;
using CSharpFunctionalExtensions;
using Domain.Entities.ProgramContext;

namespace Application.Services.Implementations.FileCheckServices
{
    public class ProgramFileChecksService : IProgramFileChecksService
    {
        private readonly IProgramFileParser _parser;
        private readonly IRuleSectionCheckService _sectionService;
        private readonly IRuleWordCheckService  _wordService;

        public ProgramFileChecksService(IProgramFileParser parser,
                                        IRuleSectionCheckService sectionService,
                                        IRuleWordCheckService wordService)
        {
            _parser = parser;
            _sectionService = sectionService;
            _wordService = wordService;
        }


        public async Task<Result<List<CheckError>, ServiceError>> CheckFile(Stream fileStream, CancellationToken cancellationToken)
        {
            var structure = _parser.ParseFile(fileStream);

            var sectionsErrors = await _sectionService.CheckProgramSections(structure, cancellationToken);
            var wordsError = await _wordService.CheckProgramWords(structure, cancellationToken);

            sectionsErrors.AddRange(wordsError);

            return Result.Success<List<CheckError>, ServiceError>(sectionsErrors);
        }
    }
}
