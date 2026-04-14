using Application.Abstractions.Repositories;
using Domain.Entities;

namespace Infrastructure.Database.Repositories
{
    public class ProgramRepository(AppDBContext context) : BaseRepository<EduProgram>(context), IProgramRepository
    {
     
    }
}
