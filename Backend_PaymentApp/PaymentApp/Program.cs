using DataAccess_Layer;
using DataAccess_Layer.Models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//this line configures the entity framework for this PaymentApp application centralizing it in a single location and coonfiguring it here using an extension method
builder.Services.AddConnectionConfiguration(builder.Configuration);

//builder.Services.AddDbContext<PaymentDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnectionString")));

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

//app.UseDefaultFiles(); //it loads the static files
//app.UseStaticFiles(); // used to render the static files like index.html

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();

app.MapControllers();
//app.MapFallbackToFile("index.html"); // It must be after the controllers
//app.MapFallbackToFile("/");

app.Run();
