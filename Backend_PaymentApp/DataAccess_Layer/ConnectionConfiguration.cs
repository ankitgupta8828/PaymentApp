using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess_Layer
{
    public static class ConnectionConfiguration
    {
        public static IServiceCollection AddConnectionConfiguration(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddDbContext<AppDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("AppConnectionString")));
        
            return service;
        }
    }
}
