using System.Collections.Generic;
using System.Globalization;
using System.IO;
using CsvHelper;
using SampleApp.Server.Models.Entities;
    //used in applicationdb context to seed database
    public class CsvDataLoader
    {
        public static List<DataEngineerSalary> LoadDataEngineerSalaries(string filePath)
        {
            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            var records = csv.GetRecords<DataEngineerSalary>();
            return new List<DataEngineerSalary>(records);
        }
    }