using Microsoft.EntityFrameworkCore;

public class McrmContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Interaction> Interactions { get; set; }

    public McrmContext(DbContextOptions<McrmContext> options)
            : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure many-to-many relationship
        modelBuilder.Entity<UserInteraction>()
            .HasKey(ui => new { ui.UserId, ui.InteractionId });

        modelBuilder.Entity<UserInteraction>()
            .HasOne(ui => ui.Interaction)
            .WithMany(i => i.UserInteractions)
            .HasForeignKey(ui => ui.InteractionId);

        base.OnModelCreating(modelBuilder);
    }
}