using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentApp.Models;

namespace PaymentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentDetailModelsController : ControllerBase
    {
        private readonly PaymentDBContext _context;

        public PaymentDetailModelsController(PaymentDBContext context)
        {
            _context = context;
        }

        // GET: api/PaymentDetailModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentDetailModel>>> GetPaymentDetails()
        {
            return await _context.PaymentDetails.ToListAsync();
        }

        // GET: api/PaymentDetailModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentDetailModel>> GetPaymentDetailModel(int id)
        {
            var paymentDetailModel = await _context.PaymentDetails.FindAsync(id);

            if (paymentDetailModel == null)
            {
                return NotFound();
            }

            return paymentDetailModel;
        }

        // PUT: api/PaymentDetailModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentDetailModel(int id, PaymentDetailModel paymentDetailModel)
        {
            if (id != paymentDetailModel.PaymentDetailId)
            {
                return BadRequest();
            }

            _context.Entry(paymentDetailModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentDetailModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PaymentDetailModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentDetailModel>> PostPaymentDetailModel(PaymentDetailModel paymentDetailModel)
        {
            _context.PaymentDetails.Add(paymentDetailModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentDetailModel", new { id = paymentDetailModel.PaymentDetailId }, paymentDetailModel);
        }

        // DELETE: api/PaymentDetailModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentDetailModel(int id)
        {
            var paymentDetailModel = await _context.PaymentDetails.FindAsync(id);
            if (paymentDetailModel == null)
            {
                return NotFound();
            }

            _context.PaymentDetails.Remove(paymentDetailModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentDetailModelExists(int id)
        {
            return _context.PaymentDetails.Any(e => e.PaymentDetailId == id);
        }
    }
}
