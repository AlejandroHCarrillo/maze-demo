using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ValantDemoApi;

namespace ValantDemoApi.Controllers
{

    [Route("[controller]")]
    [ApiController]
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

        [HttpGet]
        [Route(Routes.mazeList)]
        public List<string> GetMazefiles() {
        string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "librarymaze");

          List<string> retList = new List<string>();

          foreach (string file in Directory.EnumerateFiles(folderPath, "*.txt"))
          {

            retList.Add(file.Replace(folderPath + "\\", ""));
            //string contents = File.ReadAllText(file);
          }
          return retList;
        }

        [HttpGet]
        [Route(Routes.mazeContent)]
        public string GetMazeContent(string filename)
        {
          string filePath = Path.Combine(Directory.GetCurrentDirectory(), "librarymaze", filename);

          string mazeContent = "";

          try
          {
            using StreamReader reader = new(filePath);

           mazeContent = reader.ReadToEnd();
            
          }
          catch (IOException e)
          {
            //Console.WriteLine("Error: The file couldn´t be readed");
            //Console.WriteLine(e.Message);
          }

          return mazeContent;
        }
  }
}
