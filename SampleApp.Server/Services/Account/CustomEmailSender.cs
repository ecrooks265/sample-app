﻿using Microsoft.AspNetCore.Identity;
using SampleApp.Server.Models.Entities;

namespace SampleApp.Services.Account;

public interface IEmailTemplateSender<TUser> : IEmailSender<TUser> where TUser : class, new() {
    void SendEmail(string? fromEmail, string? toEmail, string subject, string htmlMessage);
    Task SendEmailAsync(string email, string subject, string htmlMessage);
}

public class EmailConfirmationModel {
    public string ConfirmationLink { get; set; }
    public string BaseUrl { get; set; }
}

public class EmailTemplateSender<TUser> : IEmailSender<TUser> where TUser : class, new() {
    #region Constructor
    private readonly ILogger<EmailTemplateSender<TUser>> _logger;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _config;
    private readonly ILiquidTemplateProvider _templateProvider;

    // Add template support software here
    public EmailTemplateSender(
        ILogger<EmailTemplateSender<TUser>> logger,
        IEmailService emailService,
        IConfiguration config,
        ILiquidTemplateProvider templateProvider
    ) {
        _logger = logger;
        _emailService = emailService;
        _config = config;
        _templateProvider = templateProvider;
    }
    #endregion

    #region Standard interface functions for EmailSender
    public void SendEmail(string? fromEmail, string? toEmail, string subject, string htmlMessage) {
        // Do the templates stuff here, change the value of htmlMessage to the template
        _emailService.SendEmail(fromEmail, toEmail, subject, htmlMessage);
    }

    public Task SendConfirmationLinkAsync(TUser user, string email, string confirmationLink) {
        var emailTemplateModel = new EmailConfirmationModel();
        string queryParams = confirmationLink.Substring(confirmationLink.IndexOf("?"));
        string baseUrl = _config["Configurations:BaseUrl"];
        string angularConfirmationLink = baseUrl + "/account/confirm-email" + queryParams + "&email=" + email;

        emailTemplateModel.ConfirmationLink = angularConfirmationLink;
        emailTemplateModel.BaseUrl = baseUrl;

        // Define the email template as a string
        var template = @"
            <html>
            <body>
                <h1>Sample App</h1>
                <p>Hello valued customer!!!!!!!!!!!!</p>
                <p>Your account confirmation link: <a href=""{{ ConfirmationLink }}"">Click to confirm</a></p>
                <br>
                <div>Account confirmed? Return to our site: <a href=""{{ BaseUrl }}"">Heinens Signs</a></div>
            </body>
            </html>";

        // Render the template with the provided model
        var htmlMessage = _templateProvider.RenderTemplate(template, emailTemplateModel);
        SendEmail(fromEmail: "email@email.com", toEmail: email, subject: "Confirm your account", htmlMessage: htmlMessage);
        return Task.CompletedTask;
    }

    public Task SendPasswordResetCodeAsync(TUser user, string email, string resetCode) {
        // Feeling mutinous so this is going to send a link, not just a code
        var emailTemplateModel = new EmailConfirmationModel();
        string baseUrl = _config["Configurations:BaseUrl"];
        string angularConfirmationLink = baseUrl + "/account/change-password?code=" + resetCode + "&email=" + email;

        emailTemplateModel.ConfirmationLink = angularConfirmationLink;
        emailTemplateModel.BaseUrl = baseUrl;

        // Define the email template as a string
        var template = @"
            <html>
            <body>
                <h1>Sample App</h1>
                <p>Hello valued customer!!!!!!!!!!!</p>
                <p>Your password reset link: <a href=""{{ ConfirmationLink }}"">Click to reset</a></p>
            </body>
            </html>";

        // Render the template with the provided model
        var htmlMessage = _templateProvider.RenderTemplate(template, emailTemplateModel);
        SendEmail(fromEmail: "email@email.com", toEmail: email, subject: "Reset your password", htmlMessage: htmlMessage);
        return Task.CompletedTask;
    }

    public Task SendPasswordResetLinkAsync(TUser user, string email, string resetLink) {
        SendEmail(fromEmail: "email@email.com", toEmail: email, subject: "Reset your account", htmlMessage: resetLink);
        return Task.CompletedTask;
    }

    public Task SendEmailAsync(string email, string subject, string htmlMessage) {
        SendEmail(fromEmail: "email@email.com", toEmail: email, subject: subject, htmlMessage: htmlMessage);
        return Task.CompletedTask;
    }
    #endregion
}