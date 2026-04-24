using Application.DTO.Rules;
using Application.Services.Definitions;
using AutoMapper;
using Domain.Entities.Rules;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.Common;
using Presentation.Contracts.Rule;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RuleController : BaseController
    {
        private readonly IWordRulesService _wordService;
        private readonly ISectionRulesService _sectionService;

        private readonly IMapper _mapper;

        public RuleController(IWordRulesService wordService,
                              ISectionRulesService sectionService,
                              IMapper mapper)
        {
            _wordService = wordService;
            _sectionService = sectionService;
            _mapper = mapper;
        }

        [HttpPost("Word")]
        [ProducesResponseType(typeof(CreateResponse), 200)]
        public async Task<IActionResult> AddRuleWord(CreateWordRuleRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<CreateWordRuleDTO>(request);

            var result = await _wordService.CreateRule(dto, cancellationToken);
            return FromResult(result);
        }


        [HttpGet("Word")]
        [ProducesResponseType(typeof(List<GetWordRuleResponseDTO>), 200)]
        public async Task<IActionResult> GetRulesWord(CancellationToken cancellationToken)
        {
            var result = await _wordService.GetRules(cancellationToken);
            return FromResult(result);
        }

        [HttpDelete("Word")]
        public async Task<IActionResult> DeleteRuleWord(Guid ruleId, CancellationToken cancellationToken)
        {
            var result = await _wordService.DeleteRule(ruleId, cancellationToken);
            return FromResult(result);
        }


        [HttpPut("Word")]
        public async Task<IActionResult> UpdateRuleWord(UpdateWordRuleRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<UpdateWordRuleDTO>(request);

            var result = await _wordService.UpdateRule(dto, cancellationToken);
            return FromResult(result);
        }

        [HttpPost("Section")]
        [ProducesResponseType(typeof(CreateResponse), 200)]
        public async Task<IActionResult> AddRuleSection(CreateSectionRuleRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<CreateSectionRuleDTO>(request);

            var result = await _sectionService.CreateRule(dto, cancellationToken);
            return FromResult(result);
        }


        [HttpGet("Section")]
        [ProducesResponseType(typeof(List<GetSectionRuleResponseDTO>), 200)]
        public async Task<IActionResult> GetRulesSection(CancellationToken cancellationToken)
        {
            var result = await _sectionService.GetRules(cancellationToken);
            return FromResult(result);
        }

        [HttpDelete("Section")]
        public async Task<IActionResult> DeleteRuleSection(Guid ruleId, CancellationToken cancellationToken)
        {
            var result = await _sectionService.DeleteRule(ruleId, cancellationToken);
            return FromResult(result);
        }


        [HttpPut("Section")]
        public async Task<IActionResult> UpdateRuleSection(UpdateSectionRuleRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<UpdateSectionRuleDTO>(request);

            var result = await _sectionService.UpdateRule(dto, cancellationToken);
            return FromResult(result);
        }
    }
}
