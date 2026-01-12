using DataAccess_Layer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess_Layer
{
    public class AppDbContext : IdentityDbContext<Users>
    {
        /*Note : DbContextOptions it is used to access the configurations of the db Context like connectionstring and etc ,
        and then pass them to the parent class constructor using the ase keyword.*/
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<PaymentDetailModel> PaymentDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }
    }
}
