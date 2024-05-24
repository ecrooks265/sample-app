using MimeKit;
using MimeKit.Utils;
using MailKit.Net.Smtp;
using Ganss.Xss;

namespace SampleApp.Services.Account;

public interface IEmailService {
    void SendEmail(string? fromEmail, string? toEmail, string subject, string htmlMessage);
    Task SendEmailAsync(string email, string subject, string htmlMessage);
}

public class EmailService : IEmailService {
    #region Constructor
    private readonly ILogger<EmailService> _logger;
    private readonly IConfiguration _config;
    private readonly IHtmlSanitizer _htmlSanitizer;

    public EmailService(
        ILogger<EmailService> logger,
        IConfiguration config,
        IHtmlSanitizer htmlSanitizer
    ) {
        _logger = logger;
        _config = config;
        _htmlSanitizer = htmlSanitizer;
    }
    #endregion

    public void SendEmail(string? fromEmail, string? toEmail, string subject, string htmlMessage) {
       
        _htmlSanitizer.AllowedAttributes.Add("class");
        _htmlSanitizer.AllowedAttributes.Add("style");
        _htmlSanitizer.AllowedTags.Add("class");
        _htmlSanitizer.AllowedTags.Add("style");

        subject = _htmlSanitizer.Sanitize(
            subject.Length > 65 ? subject.Substring(0, 64) : subject);
        htmlMessage = _htmlSanitizer.Sanitize(htmlMessage);

        toEmail = string.IsNullOrWhiteSpace(toEmail)
            ? _config["Email:FromUser"]
            : _htmlSanitizer.Sanitize(
                toEmail.Length > 65 ? toEmail.Substring(0, 64) : toEmail);
        fromEmail = string.IsNullOrWhiteSpace(fromEmail)
            ? _config["Email:FromUser"]
            : _htmlSanitizer.Sanitize(
                fromEmail.Length > 65 ? fromEmail.Substring(0, 64) : fromEmail);

        var mEmail = new MailboxAddress("", toEmail);
        var mFrom = new MailboxAddress("", fromEmail);

        var emailMessage = new MimeMessage();

        // Add test e-mails from appsettings.json

        emailMessage.To.Add(mEmail);
        emailMessage.From.Add(mFrom);
        emailMessage.Headers.Add("AS3-From", "PILM");
        emailMessage.Headers.Add("AS3-To", "SARS");
        emailMessage.Date = DateTimeOffset.Now;
        emailMessage.MessageId = MimeUtils.GenerateMessageId();
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart("html") {
            Text = htmlMessage
        };

        // Interesting Click Tracking
        // https://sendgrid.com/docs/User_Guide/Settings/tracking.html

        var client = new SmtpClient();

        try {
            client.Connect(_config["Email:Server"], 465, true);
            client.Send(emailMessage);
            client.Disconnect(true);
            client.Dispose();
            _logger.LogInformation($"..Email to {toEmail} queued successfully!");
        } catch (Exception ex) {
            _logger.LogInformation($"Error: Failed to Email to {toEmail}");
        }
    }

    public Task SendEmailAsync(string email, string subject, string htmlMessage) {
        SendEmail(fromEmail: "email@email.com", toEmail: email, subject: subject, htmlMessage: htmlMessage);
        return Task.CompletedTask;
    }
}
