

using API.DTOs;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Util.Store;
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

        public async void SendEmail(EmailDto request)
        {
            var scopes = new[] { "https://mail.google.com/" };

            var clientId = _config["Google:ClientId"];
            var clientSecret = _config["Google:ClientSecret"];

            var secrets = new ClientSecrets
            {
                ClientId = clientId,
                ClientSecret = clientSecret
            };

           

            // var credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
            //         secrets,
            //         scopes,
            //         "user",
            //         CancellationToken.None,
            //         new FileDataStore(Directory.GetCurrentDirectory(), true)).Result;

            // Console.WriteLine("credential: " + credential);

            var host = _config["Smtp:EmailHost"];
            var port = int.Parse(_config["Smtp:EmailPort"]);
            var userMail = _config["Smtp:EmailUsername"];
            var password = _config["Smtp:EmailPassword"];



             // Create the email message
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(userMail));
            message.To.Add(MailboxAddress.Parse(request.To));
            message.Subject = request.Subject;
            message.Body = new TextPart("plain") { Text = request.Body };

           Console.WriteLine("message: " + message);   

        //    if (credential.Token.IsStale)
        //     {
        //         await credential.RefreshTokenAsync(CancellationToken.None);
        //     } 

              
            try
                {
                    Console.WriteLine("userMail " + userMail);
                    Console.WriteLine("password " + password);

                    using (var client = new SmtpClient())
                    {
                        client.Connect("smtp.gmail.com",  465, true);
                        // var oauth2 = new SaslMechanismOAuth2(userMail, credential.Token.AccessToken);
                        // Console.WriteLine("oauth2: " + oauth2);
                        client.Authenticate(userMail, password);
                        await client.SendAsync(message);
                        client.Disconnect(true);
                    }
                }
                catch (Exception ex)
                    {
                        Console.WriteLine("Error: " + ex.Message);
                    }
                 }

        public class EmailMessage
        {
            public string To { get; set; }
            public string From { get; set; }
            public string Subject { get; set; }
            public string MessageText { get; set; }

            public MimeMessage GetMessage()
            {
                var body = MessageText;
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("From a user", From));
                message.To.Add(new MailboxAddress("To a user", To));
                message.Subject = Subject;
                message.Body = new TextPart("plain") { Text = body };
                return message;
            }
        }

    }
}



