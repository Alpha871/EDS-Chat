

using Application.Information;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InformationController:BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetInformations() {
            return handleResult(await Mediator.Send(new List.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetInformation(Guid id) {
            return handleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost] 
        public async Task<IActionResult> AddInformation(CompanyInformation companyInformation) {
            return handleResult(await Mediator.Send(new Create.Command{CompanyInformation = companyInformation}));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut] 
        public async Task<IActionResult> UpdateInformation(Update.Command command) {
            return handleResult(await Mediator.Send(command));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")] 
        public async Task<IActionResult> DeleteInformation(Guid id) {
            return handleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}