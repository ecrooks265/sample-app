using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Text.Encodings.Web;

namespace SampleApp.Services.Account
{
    public interface ISendGridEmailService<TUser> where TUser : class
    {
        Task SendConfirmationEmailAsync(TUser user, string email, string confirmationCode, string requestingUrl);
        Task SendPasswordResetEmailAsync(TUser user, string email, string resetCode, string requestingUrl);
        Task ResendConfirmationEmailAsync(TUser user, string email, string requestingUrl);
    }
    public class SendGridEmailService<TUser> : ISendGridEmailService<TUser> where TUser : class
    {
        private readonly SendGridClient _client;

        public SendGridEmailService(string apiKey)
        {
            _client = new SendGridClient(apiKey);
        }

        public async Task SendConfirmationEmailAsync(TUser user, string email, string confirmationCode, string requestingUrl)
        {
            var from = new EmailAddress("", "Name"); //replace email with email from sendgrid
            var to = new EmailAddress(email);
            var subject = "Confirm your email address";
            var plainTextContent = $"Please confirm your email address by clicking the link: {HtmlEncoder.Default.Encode(requestingUrl)}";
            var htmlContent = $"<strong>Please confirm your email address by clicking the link: <a href=\"{HtmlEncoder.Default.Encode(requestingUrl)}\">here</a></strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await _client.SendEmailAsync(msg);
        }

        public async Task SendPasswordResetEmailAsync(TUser user, string email, string resetCode, string requestingUrl)
        {
            var from = new EmailAddress("", "Name"); //replace email with email from sendgrid
            var to = new EmailAddress(email);
            var subject = "Reset your password";
            var plainTextContent = $"Please reset your password by clicking the link: {HtmlEncoder.Default.Encode(requestingUrl)}";
            var htmlContent = $"<strong>Please reset your password by clicking the link: <a href=\"{HtmlEncoder.Default.Encode(requestingUrl)}\">here</a></strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await _client.SendEmailAsync(msg);
        }

        public async Task ResendConfirmationEmailAsync(TUser user, string email, string requestingUrl)
        {
            var from = new EmailAddress("", "Name"); //replace email with email from sendgrid
            var to = new EmailAddress(email);
            var subject = "Confirm your email address";
            var plainTextContent = $"Please confirm your email address by clicking the link: {HtmlEncoder.Default.Encode(requestingUrl)}";
            var htmlContent = $"<strong>Please confirm your email address by clicking the link: <a href=\"{HtmlEncoder.Default.Encode(requestingUrl)}\">here</a></strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await _client.SendEmailAsync(msg);
        }
    }
}
