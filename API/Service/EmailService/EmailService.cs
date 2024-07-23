
using API.DTOs;
using MailKit.Net.Smtp;
using MailKit.Security;

using MimeKit;

namespace API.Service.EmailService
{
   public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendEmail(EmailDto request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = request.Body };

            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection(_config["EmailHost"]).Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection(_config["EmailUsername"]).Value, _config.GetSection(_config["EmailPassword"]).Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}