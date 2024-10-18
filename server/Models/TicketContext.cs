using Microsoft.EntityFrameworkCore;

namespace TicketApi.Models;

public class TicketContext : DbContext
{
    public TicketContext(DbContextOptions<TicketContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql("Host=db;Port=5432;Database=yahya_db;Username=yahya;Password=yahyaPASSWORD");
        }
    }

    public DbSet<Ticket> Tickets { get; set; } = null!;
}