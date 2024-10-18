using Microsoft.EntityFrameworkCore;
using TicketApi.Models;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddDbContext<TicketContext>(options =>
    options.UseNpgsql("Host=postgres;Port=5432;Database=yahya_db;Username=yahya;Password=yahyaPASSWORD"));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(
                              "http://localhost:3000",     // Your Next.js frontend
                              "http://localhost",          // General localhost access
                              "http://localhost:8080",       // Nginx reverse proxy on port 8080
                              "http://frontend",           // Docker container name for frontend
                              "http://backend"             // Docker container name for backend
                          )
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();  // To allow cookies or tokens
                      });
});

builder.WebHost.UseUrls("http://0.0.0.0:5286");


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
