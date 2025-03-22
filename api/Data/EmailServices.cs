using System.Net;
using System.Net.Mail;

namespace Data.EmailServices {
    public class EmailService
        {
            private readonly string _smtpHost;
            private readonly int _smtpPort;
            private readonly string _smtpUsername;
            private readonly string _smtpPassword;

            public EmailService(IConfiguration configuration)
            {
                var mailtrapSettings = configuration.GetSection("Mailtrap");
                _smtpHost = mailtrapSettings["Host"];
                _smtpPort = int.Parse(mailtrapSettings["Port"]);
                _smtpUsername = mailtrapSettings["Username"];
                _smtpPassword = mailtrapSettings["Password"];
            }

            public void SendEmail(string from, string to, string subject, string body)
            {
                using (var client = new SmtpClient(_smtpHost, _smtpPort))
                {
                    client.Credentials = new NetworkCredential(_smtpUsername, _smtpPassword);
                    client.EnableSsl = true;

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(from),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = false
                    };

                    mailMessage.To.Add(to);

                    try
                    {
                        client.Send(mailMessage);
                        Console.WriteLine("Email sent successfully.");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error sending email: {ex.Message}");
                        throw;
                    }
                }
            }
        }
}