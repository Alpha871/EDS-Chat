

using Application.Company;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class CompanyController:BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCompanies() {
            return handleResult(await Mediator.Send(new List.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCompany(Guid id) {
            return handleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [Authorize(Roles = "Admin")]

        [HttpPost] 
        public async Task<IActionResult> AddCompany(Company company) {
            return handleResult(await Mediator.Send(new Create.Command{Company = company}));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut] 
        public async Task<IActionResult> UpdateCompany(Update.Command command) {
            return handleResult(await Mediator.Send(command));
        }
        //  [Authorize(Roles = "Admin")]
        // [HttpDelete("{id}")] 
        // public async Task<IActionResult> DeleteInformation(Guid id) {
        //     return handleResult(await Mediator.Send(new Delete.Command{Id = id}));
        // }

    }
}