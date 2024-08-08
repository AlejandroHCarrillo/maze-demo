using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;

namespace ValantDemoApi.Tests
{
  [TestFixture]
  public class ValantDemoApiTests
  {
    private HttpClient client;

    [OneTimeSetUp]
    public void Setup()
    {
      var factory = new APIWebApplicationFactory();
      this.client = factory.CreateClient();
    }

    [Test]
    public void ShouldReturntrue()
    {
      Assert.IsTrue(true);
    }

    [Test]
    public async Task ShouldReturnAllFourDirectionsForMovementThroughMaze()
    {
      var result = await this.client.GetAsync("/Maze");
      result.EnsureSuccessStatusCode();
      var content = JsonConvert.DeserializeObject<string[]>(await result.Content.ReadAsStringAsync());
      content.Should().Contain("Up");
      content.Should().Contain("Down");
      content.Should().Contain("Left");
      content.Should().Contain("Right");
      Assert.AreEqual(1, 1);
    }

    [Test]
    public async Task ShouldUploadaMaze()
    {
      var result = await this.client.GetAsync("/Maze");
      var path = Path.Combine( Directory.GetCurrentDirectory(), "librarymaze");

      //  // arrange
      //Mock<HttpContextBase> httpContextMock = new Mock<HttpContextBase>();
      //  var serverMock = new Mock<HttpServerUtilityBase>();
      //  serverMock.Setup(x => x.MapPath("~/app_data")).Returns(path);
      //  httpContextMock.Setup(x => x.Server).Returns(serverMock.Object);
      //  var sut = new HomeController();
      //  sut.ControllerContext = new ControllerContext(httpContextMock.Object, new RouteData(), sut);

      //  var file1Mock = new Mock<HttpPostedFileBase>();
      //  file1Mock.Setup(x => x.FileName).Returns("file1.pdf");
      //  var file2Mock = new Mock<HttpPostedFileBase>();
      //  file2Mock.Setup(x => x.FileName).Returns("file2.doc");
      //  var files = new[] { file1Mock.Object, file2Mock.Object };

      //  // act
      //  var actual = sut.UploadFile(files);

      //  // assert
      //  file1Mock.Verify(x => x.SaveAs(path+@"\file1.pdf"));
      //  file2Mock.Verify(x => x.SaveAs(path+@"\file2.doc"));

    }

  }
}
