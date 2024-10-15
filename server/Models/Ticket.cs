using System;

namespace TicketApi.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Description { get; set; } = "";
        public string Status { get; set; } = "Open";  // Open or Closed
        public DateTime DateCreated { get; set; }
    }
}
