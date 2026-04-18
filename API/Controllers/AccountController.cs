using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entites;
using API.ExtensionMethod;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(AppDbContext context,ITokenService tokenservice) : BaseApiController
    {

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<UserDto>> RegisterUser(RegisterDto registerDto)
        {
            if(await DuplicateEmailCheck(registerDto.Email)) return BadRequest("Email taken");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();
           return user.returnUser(tokenservice);
        }

        // Login controller
        [HttpPost]
        [Route("LoginUser")]
        public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDetails)
        {
            var user = context.Users.SingleOrDefault(x=>x.Email.ToLower() == loginDetails.Email.ToLower());

            if(user == null) return Unauthorized("Invalid Email address");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDetails.Password));

            for(var i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] !=user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return user.returnUser(tokenservice);
        }


        private async Task<bool> DuplicateEmailCheck(string email)
        {
            return await context.Users.AnyAsync(x=> x.Email.ToLower() == email.ToLower());
        }
    }
}

