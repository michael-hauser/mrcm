using Microsoft.AspNetCore.Mvc;

[Route("api/users")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly McrmContext _context;

    public UsersController(McrmContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Users.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_context.Users.FirstOrDefault(u => u.Id == id));
    }

    [HttpPost]
    public IActionResult Post([FromBody] User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] User user)
    {
        var existingUser = _context.Users.FirstOrDefault(u => u.Id == id);
        if (existingUser == null)
        {
            return NotFound();
        }
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.Email = user.Email;
        _context.SaveChanges();
        return Ok(_context.Users.FirstOrDefault(u => u.Id == id));
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return NotFound();
        }
        _context.Users.Remove(user);
        _context.SaveChanges();
        return Ok();
    }
}