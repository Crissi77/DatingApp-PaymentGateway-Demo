using System;
using API.DTOs;
using API.Entites;
using API.Interfaces;

namespace API.ExtensionMethod;

public static class AppUserExtension
{
    public static UserDto returnUser(this AppUser user,ITokenService tokenService)
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            token = tokenService.CreateToken(user)
        };
    }
}
