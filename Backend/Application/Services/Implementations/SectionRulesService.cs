using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using Application.DTO.Rules;
using Application.Services.Definitions;
using AutoMapper;
using CSharpFunctionalExtensions;
using Domain.Entities.Rules;

namespace Application.Services.Implementations
{
    public class SectionRulesService : ISectionRulesService
    {
        private readonly ISectionRuleRepository _repository;
        private readonly IMapper _mapper;

        public SectionRulesService(ISectionRuleRepository repository,
                                  IMapper mapper)
        {
            _repository = repository;   
            _mapper = mapper;   
        }

        public async Task<Result<CreateOperationResponseDTO, ServiceError>> CreateRule(CreateSectionRuleDTO dto, CancellationToken cancellationToken)
        {
            if (String.IsNullOrWhiteSpace(dto.SectionName))
            {
                return Result.Failure<CreateOperationResponseDTO, ServiceError>(new(ErrorsCode.INCORRECT_PARAMETERS, ""));
            }

            List<RuleSectionStructure> lines = [];

            Guid newRuleId = Guid.NewGuid();

            foreach (var line in dto.Structure)
            {
                lines.Add(new()
                {
                    Id = Guid.NewGuid(),
                    Name = line.Name,
                    SectionId = newRuleId,
                });
            }

            RuleSection newRule = new()
            {
                Id = newRuleId,
                SectionName = dto.SectionName,
                Structure = lines,
                Type = dto.Type,
                Commentary = dto.Commentary,
            };

            var newGuid = await _repository.AddNew(newRule, cancellationToken);
            return Result.Success<CreateOperationResponseDTO, ServiceError>(new(newGuid));
        }

        public async Task<UnitResult<ServiceError>> DeleteRule(Guid ruleId, CancellationToken cancellationToken)
        {
            if (ruleId == Guid.Empty)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.INCORRECT_PARAMETERS, ""));
            }

            await _repository.DeleteById(ruleId, cancellationToken);
            return UnitResult.Success<ServiceError>();
        }

        public async Task<Result<List<GetSectionRuleResponseDTO>, ServiceError>> GetRules(CancellationToken cancellationToken)
        {
            var rules = await _repository.GetRules(cancellationToken) ?? [];

            var mappedRules = _mapper.Map<List<GetSectionRuleResponseDTO>>(rules);

            return Result.Success<List<GetSectionRuleResponseDTO>, ServiceError>(mappedRules);
        }

        public async Task<UnitResult<ServiceError>> UpdateRule(UpdateSectionRuleDTO dto, CancellationToken cancellationToken)
        {
            var rule = await _repository.GetByIdWithStructure(dto.RuleId, cancellationToken);
            if (rule == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            rule.Commentary = dto.Commentary;
            rule.SectionName = dto.SectionName;
            rule.Type = dto.Type;

            rule.Structure = dto.Structure?.Select(item => new RuleSectionStructure
            {
                Id = Guid.NewGuid(),
                Name = item.Name,
                SectionId = rule.Id,
            }).ToList() ?? new List<RuleSectionStructure>();

            await _repository.UpdateDeep(rule, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}
