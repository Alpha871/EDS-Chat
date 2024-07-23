using API.DTOs;

namespace API.Service.EmailService
{
    public interface IEmailService
    {
       void SendEmail(EmailDto request);
    }
}