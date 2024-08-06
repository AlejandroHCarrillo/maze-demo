using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ValantDemoApi;

namespace ValantDemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MazeController : ControllerBase
    {
        private readonly ILogger<MazeController> _logger;
        public MazeController(ILogger<MazeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<string> GetNextAvailableMoves()
        {
          return new List<string> {"Up", "Down", "Left", "Right"};
        }

        [HttpPost]
        [Route(Routes.mazeupload)]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
          if (file == null || file.Length == 0)
            return Content("file not selected");

          var path = Path.Combine(
                          Directory.GetCurrentDirectory(), "librarymaze",
                          file.FileName);

          using (var stream = new FileStream(path, FileMode.Create))
          {
            await file.CopyToAsync(stream);
          }

          return Ok(new { path });
        }

  }
}
