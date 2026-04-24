//using Infrastructure.Database.Configurations;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.References;
using Domain.Entities.Rules;
using Domain.Entities.ProgramContext;

namespace Infrastructure.Database
{
    public class AppDBContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Direction> Directions { get; set; } = null!;

        public DbSet<EduYear> EduYears { get; set; } = null!;

        public DbSet<ProgramReview> Reviews { get; set; } = null!;

        public DbSet<EduProgram> EduPrograms { get; set; } = null!;

        public DbSet<ProgramVersion> ProgramVersions { get; set; } = null!;

        public DbSet<ProgramHistory> ProgramHistories { get; set; } = null!;

        public DbSet<RuleWord> RuleWords { get; set; } = null!;

        public DbSet<RuleSection> RuleSections { get; set; } = null!;

        public DbSet<TechCheck> TechinalChecks { get; set; } = null!;

        public DbSet<RuleSectionStructure> RuleStructures { get; set; } = null!;

        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new ReceiptDocumentConfiguration());

        }

    }
}