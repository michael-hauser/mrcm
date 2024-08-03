public class UserInteraction
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int InteractionId { get; set; }
    public Interaction Interaction { get; set; }
}