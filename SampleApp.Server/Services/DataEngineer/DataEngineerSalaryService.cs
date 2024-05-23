using Microsoft.Data.SqlClient;
using SampleApp.Models.Entities;

namespace SampleApp.Services
{
    public interface IDataEngineerSalaryService
    {
        Task<IEnumerable<DataEngineerSalary>> GetTopPaidSalariesAsync(int count);
        Task<DataEngineerSalary> GetByIdAsync(int id);
        Task<DataEngineerSalary> GetByRemoteAsync();
        Task<IEnumerable<DataEngineerSalary>> GetByTitleAsync(string title);
        Task<IEnumerable<string>> GetUniqueJobTitlesAsync();
        Task<DataEngineerSalary> AddDataEngineerSalaryAsync(DataEngineerSalary salary);
    }
    public class DataEngineerSalaryService : IDataEngineerSalaryService
    {
        private readonly string _connectionString;
        private readonly ILogger<DataEngineerSalaryService> _logger; // Add logger


        public DataEngineerSalaryService(IConfiguration configuration, ILogger<DataEngineerSalaryService> logger)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
            _logger = logger;
        }

         public async Task<IEnumerable<DataEngineerSalary>> GetTopPaidSalariesAsync(int count)
        {
            try
            {
                // Log an informational message
                Console.WriteLine("Getting top paid salaries.");

                using (var connection = new SqlConnection(_connectionString))
                {
                    // Log connection opening
                    Console.WriteLine("Opening database connection.");

                    await connection.OpenAsync();
                    
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "SELECT TOP (@Count) * FROM dbo.DataEngineerSalaries ORDER BY CAST(salary_in_usd AS INT) DESC";
                        command.Parameters.AddWithValue("@Count", count);
                        
                        // Execute the SQL command
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            var salaries = new List<DataEngineerSalary>();
                            while (await reader.ReadAsync())
                            {
                                salaries.Add(MapToDataEngineerSalary(reader));
                            }

                            // Log the number of records retrieved
                            Console.WriteLine($"Retrieved {salaries.Count} records.");

                            return salaries;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log any exceptions that occur
                Console.WriteLine("An error occurred while getting top paid salaries: \n" + ex);
                throw;
            }
        }

        public async Task<DataEngineerSalary> GetByIdAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM dbo.DataEngineerSalaries WHERE Id = @Id";
                    command.Parameters.AddWithValue("@Id", id);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return MapToDataEngineerSalary(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public async Task<DataEngineerSalary> GetByRemoteAsync()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM dbo.DataEngineerSalaries WHERE remote_ratio = 100";

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return MapToDataEngineerSalary(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public async Task<IEnumerable<DataEngineerSalary>> GetByTitleAsync(string title)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM dbo.DataEngineerSalaries WHERE job_title = @title";
                    command.Parameters.AddWithValue("@title", title);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var salaries = new List<DataEngineerSalary>();
                        while (await reader.ReadAsync())
                        {
                            salaries.Add(MapToDataEngineerSalary(reader));
                        }
                        return salaries;
                    }
                }
            }
        }

        public async Task<IEnumerable<string>> GetUniqueJobTitlesAsync()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT DISTINCT job_title FROM dbo.DataEngineerSalaries";
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var jobTitles = new List<string>();
                        while (await reader.ReadAsync())
                        {
                            jobTitles.Add(reader.GetString(reader.GetOrdinal("job_title")));
                        }
                        return jobTitles;
                    }
                }
            }
        }

        public async Task<DataEngineerSalary> AddDataEngineerSalaryAsync(DataEngineerSalary salary)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = @"
                        INSERT INTO dbo.DataEngineerSalaries (work_year, experience_level, employment_type, job_title, salary, salary_currency, salary_in_usd, employee_residence, remote_ratio, company_location, company_size) 
                        OUTPUT INSERTED.Id 
                        VALUES (@work_year, @experience_level, @employment_type, @job_title, @salary, @salary_currency, @salary_in_usd, @employee_residence, @remote_ratio, @company_location, @company_size)";
                    
                    command.Parameters.AddWithValue("@work_year", salary.work_year);
                    command.Parameters.AddWithValue("@experience_level", salary.experience_level);
                    command.Parameters.AddWithValue("@employment_type", salary.employment_type);
                    command.Parameters.AddWithValue("@job_title", salary.job_title);
                    command.Parameters.AddWithValue("@salary", salary.salary);
                    command.Parameters.AddWithValue("@salary_currency", salary.salary_currency);
                    command.Parameters.AddWithValue("@salary_in_usd", salary.salary_in_usd);
                    command.Parameters.AddWithValue("@employee_residence", salary.employee_residence);
                    command.Parameters.AddWithValue("@remote_ratio", salary.remote_ratio);
                    command.Parameters.AddWithValue("@company_location", salary.company_location);
                    command.Parameters.AddWithValue("@company_size", salary.company_size);

                    salary.Id = (int)await command.ExecuteScalarAsync();
                    return salary;
                }
            }
        }

        // CRUD Methods

        private DataEngineerSalary MapToDataEngineerSalary(SqlDataReader reader)
        {
            return new DataEngineerSalary
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                work_year = reader.GetInt32(reader.GetOrdinal("work_year")),
                experience_level = reader.GetString(reader.GetOrdinal("experience_level")),
                employment_type = reader.GetString(reader.GetOrdinal("employment_type")),
                job_title = reader.GetString(reader.GetOrdinal("job_title")),
                salary = reader.GetString(reader.GetOrdinal("salary")),
                salary_currency = reader.GetString(reader.GetOrdinal("salary_currency")),
                salary_in_usd = reader.GetString(reader.GetOrdinal("salary_in_usd")),
                employee_residence = reader.GetString(reader.GetOrdinal("employee_residence")),
                remote_ratio = reader.GetString(reader.GetOrdinal("remote_ratio")),
                company_location = reader.GetString(reader.GetOrdinal("company_location")),
                company_size = reader.GetString(reader.GetOrdinal("company_size"))
            };
        }
    }
}
