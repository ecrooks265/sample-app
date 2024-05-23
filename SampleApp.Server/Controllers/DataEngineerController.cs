using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SampleApp.Models.Entities;
using SampleApp.Services;

namespace SampleApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataEngineerSalaryController : ControllerBase
    {
        private readonly IDataEngineerSalaryService _service;

        public DataEngineerSalaryController(IDataEngineerSalaryService service)
        {
            _service = service;
        }

        [HttpGet("top/{count}")]
        public async Task<ActionResult<IEnumerable<DataEngineerSalary>>> GetTopPaidSalaries(int count)
        {
            Console.WriteLine("Get Salaries called with data : " + count);
            var result = await _service.GetTopPaidSalariesAsync(count);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DataEngineerSalary>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("remote")]
        public async Task<ActionResult<DataEngineerSalary>> GetByRemote()
        {
            var result = await _service.GetByRemoteAsync();
            return Ok(result);
        }

        [HttpGet("title/{title}")]
        public async Task<ActionResult<IEnumerable<DataEngineerSalary>>> GetByTitle(string title)
        {
            var result = await _service.GetByTitleAsync(title);
            return Ok(result);
        }

        [HttpGet("uniqueJobTitles")]
        public async Task<ActionResult<IEnumerable<string>>> GetUniqueJobTitles()
        {
            Console.WriteLine("Get Unique Jobs called to get Titles");
            var result = await _service.GetUniqueJobTitlesAsync();
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<DataEngineerSalary>> AddDataEngineerSalary(DataEngineerSalary salary)
        {
            var result = await _service.AddDataEngineerSalaryAsync(salary);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
    }
}
