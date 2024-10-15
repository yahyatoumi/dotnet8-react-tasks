using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Required for Entity Framework Core features
using TicketApi.Models; // Ensure this matches the namespace for your Ticket model

public class PaginatedResponse<T>
{
    public int TotalItems { get; set; }
    public int TotalPages { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string NextPageUrl { get; set; } = "";
    public string PrevPageUrl { get; set; } = "";
    public IEnumerable<T> Items { get; set; } = [];
}

[Route("api/[controller]")]
[ApiController]
public class TicketController : ControllerBase
{
    private readonly TicketContext _context;

    public TicketController(TicketContext context)
    {
        _context = context;
    }

    // Create
    [HttpPost]
    public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
    {
        if (ticket.Id != 0)
        {
            return BadRequest("ID should not be provided for new tickets. The ID will be auto-generated.");
        }

        // Ensure that the status is either 'Open' or 'Closed'
        if (ticket.Status != "Open" && ticket.Status != "Closed")
        {
            return UnprocessableEntity("The status must be either 'Open' or 'Closed'.");
        }
        ticket.DateCreated = DateTime.UtcNow;

        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
    }

    // Read
    [HttpGet("{id}")]
    public async Task<ActionResult<Ticket>> GetTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
        {
            return NotFound();
        }

        return ticket;
    }

    // Read all tickets with pagination
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(int page = 1, int pageSize = 10)
    {
        // Ensure page number and size are valid
        if (page <= 0 || pageSize <= 0)
        {
            return BadRequest("Page number and size must be greater than zero.");
        }

        Console.WriteLine($"Page: {page}, PageSize: {pageSize}");


        var totalItems = await _context.Tickets.CountAsync();
        var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        string nextPageUrl = page < totalPages ? $"?page={page + 1}&pageSize={pageSize}" : "";
        string prevPageUrl = page > 1 ? $"?page={page - 1}&pageSize={pageSize}" : "";

        // Skip the previous pages and take only the current page's tickets
        var tickets = await _context.Tickets
    .OrderByDescending(t => t.DateCreated) // Sort by DateCreated in descending order
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();

        var response = new PaginatedResponse<Ticket>
        {
            TotalItems = totalItems,
            TotalPages = totalPages,
            PageNumber = page,
            PageSize = pageSize,
            NextPageUrl = nextPageUrl,
            PrevPageUrl = prevPageUrl,
            Items = tickets,
        };

        // Return the paginated result
        return Ok(response);
    }

    // Update
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTicket(int id, Ticket ticket)
    {
        var existingTicket = await _context.Tickets.FindAsync(id);
        if (existingTicket == null)
        {
            return NotFound();
        }
        ticket.Id = id;
        ticket.DateCreated = existingTicket.DateCreated;
        Console.WriteLine($"hererrrrr ${ticket.DateCreated}");

        _context.Entry(ticket).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Delete
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}