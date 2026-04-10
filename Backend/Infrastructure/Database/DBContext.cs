//using Infrastructure.Database.Configurations;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using Domain.Entities;

namespace Infrastructure.Database
{
    public class AppDBContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

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