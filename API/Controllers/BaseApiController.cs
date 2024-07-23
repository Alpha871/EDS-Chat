


using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediatR;

        protected IMediator Mediator => _mediatR ??= HttpContext
           .RequestServices.GetService<IMediator>();

        protected ActionResult handleResult<T>(Result<T> result) {
            if(result.Value == null) return NotFound();
            if(result.IsSucceed && result.Value != null) 
                return Ok(result.Value);
            if(result.IsSucceed && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

           
    }
}