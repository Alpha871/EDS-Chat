

using Application.CustomPrompt;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomPromptController:BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCustomPrompts() {
            return handleResult(await Mediator.Send(new List.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCustomPrompt(Guid id) {
            return handleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost] 
        public async Task<IActionResult> AddCustomPrompt(CustomPrompt customPrompt) {
            return handleResult(await Mediator.Send(new Create.Command{CustomPrompt = customPrompt}));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut] 
        public async Task<IActionResult> UpdateCustomPrompt(Update.Command command) {
            return handleResult(await Mediator.Send(command));
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")] 
        public async Task<IActionResult> DeleteCustomPrompt(Guid id) {
            return handleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}