using Microsoft.EntityFrameworkCore;
using PaymentApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PaymentDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnectionString")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("AllowAngular");
//app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());  // this is also one of te way to configure cors and the above one is also one of the method to do that for specific URL or accepting request froma fixe origin.
// Configure the HTTP request pipeline.

app.UseDefaultFiles(); //it loads the static files
app.UseStaticFiles(); // used to render the index.html

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html"); // It must be after the controllers

app.Run();
