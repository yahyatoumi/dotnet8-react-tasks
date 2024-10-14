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
    public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(int pageNumber = 1, int pageSize = 10)
    {
        // Ensure page number and size are valid
        if (pageNumber <= 0 || pageSize <= 0)
        {
            return BadRequest("Page number and size must be greater than zero.");
        }

        var totalItems = await _context.Tickets.CountAsync();
        var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        string nextPageUrl = pageNumber < totalPages ? $"?pageNumber={pageNumber + 1}&pageSize={pageSize}" : "";
        string prevPageUrl = pageNumber > 1 ? $"?pageNumber={pageNumber - 1}&pageSize={pageSize}" : "";

        // Skip the previous pages and take only the current page's tickets
        var tickets = await _context.Tickets
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        // Check if there are tickets to return
        if (tickets.Count == 0)
        {
            return NotFound("No tickets found for the requested page.");
        }

        var response = new PaginatedResponse<Ticket>
        {
            TotalItems = 0,
            TotalPages = 0,
            PageNumber = pageNumber,
            PageSize = pageSize,
            NextPageUrl = nextPageUrl,
            PrevPageUrl = prevPageUrl,
            Items = tickets
        };

        // Return the paginated result
        return Ok(response);
    }

    // Update
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTicket(int id, Ticket ticket)
    {
        if (id != ticket.Id)
        {
            return BadRequest();
        }

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