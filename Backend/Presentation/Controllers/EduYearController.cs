using Application.DTO.Common;
using Application.DTO.Years;
using Application.Services.Definitions;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Presentation.Contracts.Year;

namespace Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EduYearController : BaseController
    {
        private readonly IEduYearService _service;

        private readonly IMapper _mapper;

        public EduYearController(IEduYearService service,
                                 IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(typeof(CreateOperationResponseDTO), 200)]
        public async Task<IActionResult> AddNewYear(CreateYearRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<CreateYearDTO>(request);

            var result = await _service.Create(dto, cancellationToken);
            return FromResult(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<EduYear>), 200)]
        public async Task<IActionResult> GetYears(CancellationToken cancellationToken)
        {
            var result = await _service.Get(cancellationToken);
            return FromResult(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteYear(Guid guid, CancellationToken cancellationToken)
        {
            var result = await _service.Delete(guid, cancellationToken);
            return FromResult(result);
        }


        [HttpPut]
        public async Task<IActionResult> UpdateYear(UpdateYearRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<UpdateYearDTO>(request);

            var result = await _service.Update(dto, cancellationToken);
            return FromResult(result);
        }

        [HttpPatch]
        public async Task<IActionResult> ChangeYearStatus(ChangeYearStatusRequest request, CancellationToken cancellationToken)
        {
            var dto = _mapper.Map<ChangeYearStatusDTO>(request);

            var result = await _service.ChangeStatus(dto, cancellationToken);
            return FromResult(result);
        }


        [HttpPost("Notifications")]
        public async Task<IActionResult> NotificateUsers(Guid yearId, CancellationToken cancellationToken)
        {
            var result = await _service.NotificateUsers(yearId, cancellationToken);
            return FromResult(result);
        }

    }
}
