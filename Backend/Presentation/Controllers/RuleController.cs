using Application.DTO.Directions;
using Application.DTO.Rules;
using Application.Services.Definitions;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.Common;
using Presentation.Contracts.Direction;
using Presentation.Contracts.Rule;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RuleController : BaseController
    {
        private readonly IRuleService<RuleWord> _wordService;
        private readonly IRuleService<RuleSection> _sectionService;

        private readonly IMapper _mapper;

        public RuleController(IRuleService<RuleWord> wordService,
                              IRuleService<RuleSection> sectionService,
                              IMapper mapper)
        {
            _wordService = wordService;
            _sectionService = sectionService;
            _mapper = mapper;
        }

        [HttpPost("Word")]
        [ProducesResponseType(typeof(CreateResponse), 200)]
        public async Task<IActionResult> AddRuleWord(CreateRuleRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<CreateRuleDTO>(request);

            var result = await _wordService.CreateRule(dto, cancellationToken);
            return FromResult(result);
        }


        [HttpGet("Word")]
        [ProducesResponseType(typeof(List<GetRuleResponseDTO>), 200)]
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
        public async Task<IActionResult> UpdateRuleWord(UpdateRuleRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<UpdateRuleDTO>(request);

            var result = await _wordService.UpdateRule(dto, cancellationToken);
            return FromResult(result);
        }

        [HttpPost("Section")]
        [ProducesResponseType(typeof(CreateResponse), 200)]
        public async Task<IActionResult> AddRuleSection(CreateRuleRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<CreateRuleDTO>(request);

            var result = await _sectionService.CreateRule(dto, cancellationToken);
            return FromResult(result);
        }


        [HttpGet("Section")]
        [ProducesResponseType(typeof(List<GetRuleResponseDTO>), 200)]
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
        public async Task<IActionResult> UpdateRuleSection(UpdateRuleRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<UpdateRuleDTO>(request);

            var result = await _sectionService.UpdateRule(dto, cancellationToken);
            return FromResult(result);
        }
    }
}
