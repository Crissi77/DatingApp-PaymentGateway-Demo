using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PaymentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpPost("create-order")]
        public IActionResult CreateOrder()
        {

            try
            {
                var client = new RazorpayClient(
               _configuration["Razorpay:Key"],
               _configuration["Razorpay:Secret"]);

                var options = new Dictionary<string, object>
        {
            { "amount", 100 },
            { "currency", "INR" },
            { "receipt", Guid.NewGuid().ToString() }
        };

                Order order = client.Order.Create(options);

                return Ok(new
                {
                    Id = order["id"].ToString(),
                    Amount = Convert.ToInt32(order["amount"]),
                    Currency = order["currency"].ToString()

                });
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }

    }
}
