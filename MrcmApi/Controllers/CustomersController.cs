using Microsoft.AspNetCore.Mvc;

[Route("api/customers")]
[ApiController]
public class CustomersController : ControllerBase
{
    private readonly McrmContext _context;

    public CustomersController(McrmContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Customers.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_context.Customers.FirstOrDefault(c => c.Id == id));
    }

    [HttpPost]
    public IActionResult Post([FromBody] Customer customer)
    {
        _context.Customers.Add(customer);
        _context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Customer customer)
    {
        var existingCustomer = _context.Customers.FirstOrDefault(c => c.Id == id);
        if (existingCustomer == null)
        {
            return NotFound();
        }
        existingCustomer.FirstName = customer.FirstName;
        existingCustomer.LastName = customer.LastName;
        existingCustomer.Email = customer.Email;
        _context.SaveChanges();
        return Ok(_context.Customers.FirstOrDefault(c => c.Id == id));
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var customer = _context.Customers.FirstOrDefault(c => c.Id == id);
        if (customer == null)
        {
            return NotFound();
        }
        _context.Customers.Remove(customer);
        _context.SaveChanges();
        return Ok();
    }
}