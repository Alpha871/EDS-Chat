



using API.DTOs;
using API.Service.EmailService;

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class EmailController:BaseApiController
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public IActionResult SendEmail(EmailDto request)
        {
            _emailService.SendEmail(request);
            return Ok();
        }
    }
}