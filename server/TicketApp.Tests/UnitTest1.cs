using Moq;
using Xunit;
using server.Controllers;
using TicketApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Required for Entity Framework Core features
using System.Threading.Tasks;

public class TicketControllerTests
{
    [Fact]
    public async Task CreateTicket_ShouldAddTicket()
    {
        // Arrange: Create an in-memory DbContext and your controller
        var options = new DbContextOptionsBuilder<TicketContext>()
                        .UseInMemoryDatabase(databaseName: "TicketDb")
                        .Options;
        var context = new TicketContext(options);
        var controller = new TicketController(context);

        var newTicket = new Ticket { Description = "New Ticket", Status = "Open", DateCreated = DateTime.Now };

        // Act: Add the ticket
        await controller.PostTicket(newTicket);

        // Assert: Ensure the ticket was added
        var ticketInDb = context.Tickets.FirstOrDefault(t => t.Description == "New Ticket");
        Assert.NotNull(ticketInDb);
    }

    // Test for updating a ticket
    [Fact]
    public async Task UpdateTicket_ShouldUpdateTicket()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<TicketContext>()
                        .UseInMemoryDatabase(databaseName: "TicketDb")
                        .Options;
        var context = new TicketContext(options);
        var controller = new TicketController(context);

        var ticket = new Ticket { Description = "Old Ticket", Status = "Open", DateCreated = DateTime.Now };
        context.Tickets.Add(ticket);
        await context.SaveChangesAsync();

        var updatedTicket = new Ticket { Id = ticket.Id, Description = "Updated Ticket", Status = "Closed", DateCreated = DateTime.Now };

        // Act
        var result = await controller.PutTicket(ticket.Id, updatedTicket);

        // Assert
        Assert.IsType<NoContentResult>(result);
        var ticketInDb = context.Tickets.FirstOrDefault(t => t.Id == ticket.Id);
        Assert.Equal("Updated Ticket", ticketInDb.Description);
        Assert.Equal("Closed", ticketInDb.Status);
    }

    // Test for deleting a ticket
    [Fact]
    public async Task DeleteTicket_ShouldRemoveTicket()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<TicketContext>()
                        .UseInMemoryDatabase(databaseName: "TicketDb")
                        .Options;
        var context = new TicketContext(options);
        var controller = new TicketController(context);

        var ticket = new Ticket { Description = "Ticket to Delete", Status = "Open", DateCreated = DateTime.Now };
        context.Tickets.Add(ticket);
        await context.SaveChangesAsync();

        // Act
        var result = await controller.DeleteTicket(ticket.Id);

        // Assert
        Assert.IsType<NoContentResult>(result);
        var ticketInDb = context.Tickets.FirstOrDefault(t => t.Id == ticket.Id);
        Assert.Null(ticketInDb);
    }
}
