using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Programs;
using CSharpFunctionalExtensions;
using MediatR;

namespace Application.Features.Programs.Quaries.GetProgramsForTeacher
{
    public class GetProgramsForTeacherQueryHandler : IRequestHandler<GetProgramsForTeacherQuery, Result<List<ShortYearDTO>, ServiceError>>
    {
        private readonly IEduYearRepository _yearRepository;

        public GetProgramsForTeacherQueryHandler(IEduYearRepository yearRepository)
        {
            _yearRepository = yearRepository;
        }

        public async Task<Result<List<ShortYearDTO>, ServiceError>> Handle(GetProgramsForTeacherQuery request, CancellationToken cancellationToken)
        {
            var years = await _yearRepository.GetGroupedByTeacher(request.TeacherId, cancellationToken);

            return Result.Success<List<ShortYearDTO>, ServiceError>(years);
        }
    }
}
