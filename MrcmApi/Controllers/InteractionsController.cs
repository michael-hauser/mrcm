using Microsoft.AspNetCore.Mvc;

[Route("api/interactions")]
[ApiController]
public class InteractionsController : ControllerBase
{
    private readonly McrmContext _context;

    public InteractionsController(McrmContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Interactions.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_context.Interactions.FirstOrDefault(i => i.Id == id));
    }

    [HttpPost]
    public IActionResult Post([FromBody] Interaction interaction)
    {
        _context.Interactions.Add(interaction);
        _context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Interaction interaction)
    {
        var existingInteraction = _context.Interactions.FirstOrDefault(i => i.Id == id);
        if (existingInteraction == null)
        {
            return NotFound();
        }
        existingInteraction.CustomerId = interaction.CustomerId;
        existingInteraction.UserInteractions = interaction.UserInteractions;
        existingInteraction.Notes = interaction.Notes;
        existingInteraction.Date = interaction.Date;
        _context.SaveChanges();
        return Ok(_context.Interactions.FirstOrDefault(i => i.Id == id));
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var interaction = _context.Interactions.FirstOrDefault(i => i.Id == id);
        if (interaction == null)
        {
            return NotFound();
        }
        _context.Interactions.Remove(interaction);
        _context.SaveChanges();
        return Ok();
    }
}