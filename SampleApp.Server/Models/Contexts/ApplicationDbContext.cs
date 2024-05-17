using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SampleApp.Server.Models.Entities;
using SampleApp.Models.Entities.Identity;
using SampleApp.Server.Models.Entities.Identity;

namespace SampleApp.Models.Contexts
{
    public partial class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {

        #region Boilerplate
        public ApplicationDbContext() { }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration config = new ConfigurationBuilder()
                          .SetBasePath(Directory.GetCurrentDirectory())
                          .AddJsonFile("appsettings.json", false, false)
                          .AddEnvironmentVariables()
                          .Build();
            var connstring = config["ConnectionStrings:DefaultConnection"];
            optionsBuilder.UseSqlServer(connstring);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
        #endregion

        #region DbSets
      
        public virtual DbSet<DataEngineerSalary> DataEngineerSalaries { get; set; }
        
      
        #endregion

        #region TableDefinitons
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>(entity => {
                //add any custom properties (foreign keys, etc.) here
            });

            modelBuilder.Entity<DataEngineerSalary>(entity =>
            {
                 entity.Property(p => p.Id)
                .ValueGeneratedOnAdd(); // Configure Id as auto-generated
            });

            SeedData(modelBuilder);

            // Put at bottom of this method
            base.OnModelCreating(modelBuilder);
            OnModelCreatingPartial(modelBuilder);
        }
        #endregion

        private void SeedData(ModelBuilder modelBuilder)
        {
            var dataEngineerSalaries = CsvDataLoader.LoadDataEngineerSalaries(Path.Combine(Directory.GetCurrentDirectory(), "salaries-1.csv"));

            int idCounter = 1;
            foreach (var salary in dataEngineerSalaries)
            {
                salary.Id = idCounter++;
                modelBuilder.Entity<DataEngineerSalary>().HasData(salary);
            }
        }
    }
}