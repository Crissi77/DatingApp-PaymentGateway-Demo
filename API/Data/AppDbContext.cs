using System;
using API.Entites;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions Options) : base(Options){}

    public DbSet<AppUser> Users {get;set;}
    
}
