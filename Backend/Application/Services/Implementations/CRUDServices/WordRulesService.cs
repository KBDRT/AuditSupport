using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using Application.DTO.Rules;
using Application.Services.Definitions.CRUDServices;
using AutoMapper;
using CSharpFunctionalExtensions;
using Domain.Entities.References;
using Domain.Entities.Rules;

namespace Application.Services.Implementations.CRUDServices
{
    public class WordRulesService : IWordRulesService
    {
        private readonly IBaseRepository<RuleWord> _repository;
        private readonly IMapper _mapper;

        public WordRulesService(IBaseRepository<RuleWord> repository,
                                IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }


        public async Task<Result<CreateOperationResponseDTO, ServiceError>> CreateRule(CreateWordRuleDTO dto, CancellationToken cancellationToken)
        {
            if (String.IsNullOrWhiteSpace(dto.Word))
            {
                return Result.Failure<CreateOperationResponseDTO, ServiceError>(new(ErrorsCode.INCORRECT_PARAMETERS, ""));
            }

            RuleWord newRule = new()
            {
                Id = Guid.NewGuid(),
                Word = dto.Word,
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

        public async Task<Result<List<GetWordRuleResponseDTO>, ServiceError>> GetRules(CancellationToken cancellationToken)
        {
            var rules = await _repository.GetAll(cancellationToken) ?? [];

            var mappedRules = _mapper.Map<List<GetWordRuleResponseDTO>>(rules);

            return Result.Success<List<GetWordRuleResponseDTO>, ServiceError>(mappedRules);
        }

        public async Task<UnitResult<ServiceError>> UpdateRule(UpdateWordRuleDTO dto, CancellationToken cancellationToken)
        {
            var rule = await _repository.GetById(dto.RuleId, cancellationToken);
            if (rule == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            rule.Commentary = dto.Commentary;
            rule.Word = dto.Word;

            await _repository.Update(rule, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}
