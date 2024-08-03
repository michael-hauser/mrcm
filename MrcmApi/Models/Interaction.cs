public class Interaction
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string Notes { get; set; }
    public DateTime Date { get; set; }
    
    public Customer Customer { get; set; }
    public ICollection<UserInteraction> UserInteractions { get; set; }
} 