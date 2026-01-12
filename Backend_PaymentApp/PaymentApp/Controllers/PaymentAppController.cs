using DataAccess_Layer;
using DataAccess_Layer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PaymentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentAppController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PaymentAppController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetPaymentDetails")]
        public async Task<ActionResult<IEnumerable<PaymentDetailModel>>> GetPaymentDetails()
        {
            return await _context.PaymentDetails.ToListAsync();
        }

        [HttpGet("GetPaymentDetails/{id}")]
        public async Task<ActionResult<PaymentDetailModel>> GetPaymentDetails(int id)
        {
            var paymentDetail = await _context.PaymentDetails.FindAsync(id);

            if(paymentDetail == null)
            {
                return NotFound();
            }

            return Ok(paymentDetail);
        }

        [HttpPost("CreatePaymentDetail")]
        public async Task<ActionResult<PaymentDetailModel>> CreatePaymentDetail(PaymentDetailModel detail)
        {
            _context.PaymentDetails.Add(detail);
            await _context.SaveChangesAsync();

            return Ok(await _context.PaymentDetails.ToListAsync());
        }

        [HttpDelete("DeletePaymentDetail/{id}")]
        public async Task<IActionResult> DeletePaymentDetail(int id)
        {
            var paymentDetailsModel = await _context.PaymentDetails.FindAsync(id);
            if(paymentDetailsModel == null)
            {
                return NotFound();
            }
            _context.PaymentDetails.Remove(paymentDetailsModel);
            await _context.SaveChangesAsync();

            return Ok(await _context.PaymentDetails.ToListAsync());
        }
    }
}
