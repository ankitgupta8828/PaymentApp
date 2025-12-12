using Microsoft.EntityFrameworkCore;

namespace PaymentApp.Models
{
    public class PaymentDBContext : DbContext
    {
        public PaymentDBContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<PaymentDetailModel> PaymentDetails { get; set; }
    }
}
