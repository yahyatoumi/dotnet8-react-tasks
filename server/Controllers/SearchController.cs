using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketApi.Models;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ControllerBase
{
    private readonly TicketContext _context;

    public SearchController(TicketContext context)
    {
        _context = context;
    }

    // GET: api/search
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ticket>>> Search(string searchValue)
    {
        var query = _context.Tickets.AsQueryable();
        searchValue = searchValue.ToLower();

        if (!string.IsNullOrEmpty(searchValue))
        {
            query = query.Where(t => t.Description.ToLower().Contains(searchValue) || t.Status.ToLower().Contains(searchValue) || t.Id.ToString().Contains(searchValue));
        }

        var tickets = await query.Take(10).ToListAsync();

        return Ok(tickets);
    }
}
