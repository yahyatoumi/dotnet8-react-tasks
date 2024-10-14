using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MyWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "Product1", "Product2", "Product3" };
        }
    }
}