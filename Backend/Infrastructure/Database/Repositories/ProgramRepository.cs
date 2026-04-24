using Application.Abstractions.Repositories;
using Domain.Entities.ProgramContext;

namespace Infrastructure.Database.Repositories
{
    public class ProgramRepository(AppDBContext context) : BaseRepository<ProgramVersion>(context), IProgramRepository
    {
     
    }
}
