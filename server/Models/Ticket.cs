using System;
using System.ComponentModel.DataAnnotations;

public enum TicketStatus
{
    Open,
    Closed
}

namespace TicketApi.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Description { get; set; } = "";

        [ValidStatus] 
        public string Status { get; set; } = "Open";  // Open or Closed
        public DateTime DateCreated { get; set; }
    }
}

public class ValidStatusAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var status = value as string;
        if (status != "Open" && status != "Closed")
        {
            return new ValidationResult("The Status must be either 'Open' or 'Closed'.");
        }
        return ValidationResult.Success;
    }
}