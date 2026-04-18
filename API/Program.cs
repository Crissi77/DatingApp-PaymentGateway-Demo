using System.Text;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;



var builder = WebApplication.CreateBuilder(args);

// Add services to the Container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ITokenService, TokenService>();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options=>
    {
        var tokenKey = builder.Configuration["TokenKey"]
        ?? throw new Exception("Token key not recived from configuartion, Program.cs");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };

    });

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x=> x.AllowAnyHeader().AllowAnyMethod()
            .WithOrigins("https://localhost:4200","http://localhost:4200"));


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Configure the Http Request pipeline

app.UseAuthentication();
app.UseAuthorization();
    
app.MapControllers();

app.Run();