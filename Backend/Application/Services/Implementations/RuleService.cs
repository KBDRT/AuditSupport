using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using Application.DTO.Rules;
using Application.Services.Definitions;
using AutoMapper;
using CSharpFunctionalExtensions;
using Domain.Entities.Base;

namespace Application.Services.Implementations
{
    public class RuleService<T> : IRuleService<T> where T : Identifier
    {
        private readonly IBaseRepository<T> _repository;
        private readonly IMapper _mapper;

        public RuleService(IBaseRepository<T> repository,
                           IMapper mapper) 
        {
            _repository = repository;
            _mapper = mapper;
        }


        public async Task<Result<CreateOperationResponseDTO, ServiceError>> CreateRule(CreateRuleDTO dto, CancellationToken cancellationToken)
        {
            if (String.IsNullOrWhiteSpace(dto.Word))
            {
                return Result.Failure<CreateOperationResponseDTO, ServiceError>(new(ErrorsCode.INCORRECT_PARAMETERS, ""));
            }

            var newRule = _mapper.Map<T>(dto);

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

        public async Task<Result<List<GetRuleResponseDTO>, ServiceError>> GetRules(CancellationToken cancellationToken)
        {
            var rules = await _repository.GetAll(cancellationToken) ?? [];

            var response = _mapper.Map<List<GetRuleResponseDTO>>(rules);

            return Result.Success<List<GetRuleResponseDTO>, ServiceError>(response);
        }

        public async Task<UnitResult<ServiceError>> UpdateRule(UpdateRuleDTO dto, CancellationToken cancellationToken)
        {
            var rule = await _repository.GetById(dto.RuleId, cancellationToken);
            if (rule == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.NOT_FOUND, ""));
            }

            _mapper.Map(dto, rule);

            await _repository.Update(rule, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}
