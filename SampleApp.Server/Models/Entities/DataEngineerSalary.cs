namespace SampleApp.Server.Models.Entities
{
    public class DataEngineerSalary
    {
        public int Id { get; set; }
        public int work_year { get; set; }
        public string experience_level { get; set; }
        public string employment_type { get; set; }
        public string job_title { get; set; }
        public string salary { get; set; }
        public string salary_currency { get; set; }
        public string salary_in_usd { get; set; }
        public string employee_residence { get; set; }
        public string remote_ratio { get; set; }
        public string company_location {  get; set; }
        public string company_size { get; set; }

    }
}
