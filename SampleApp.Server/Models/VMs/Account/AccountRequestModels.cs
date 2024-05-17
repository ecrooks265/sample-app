using SampleApp.Models.Entities.Identity;

namespace SampleApp.Models.VMs.Account; 
public class RegisterRequest : ApplicationUser {
    //public required string UserName { get; init; }
    public required string Password { get; init; }
}
public class LoginRequest {
    /// <summary>
    /// The user's email address which acts as a user name.
    /// </summary>
    public required string Email { get; init; }

    /// <summary>
    /// The user's password.
    /// </summary>
    public required string Password { get; init; }

    /// <summary>
    /// The optional two-factor authenticator code. This may be required for users who have enabled two-factor authentication.
    /// This is not required if a <see cref="TwoFactorRecoveryCode"/> is sent.
    /// </summary>
    public string? TwoFactorCode { get; init; }

    /// <summary>
    /// An optional two-factor recovery code from <see cref="TwoFactorResponse.RecoveryCodes"/>.
    /// This is required for users who have enabled two-factor authentication but lost access to their <see cref="TwoFactorCode"/>.
    /// </summary>
    public string? TwoFactorRecoveryCode { get; init; }
}
public class RefreshRequest {
    /// <summary>
    /// The <see cref="AccessTokenResponse.RefreshToken"/> from the last "/login" or "/refresh" response used to get a new <see cref="AccessTokenResponse"/>
    /// with an extended expiration.
    /// </summary>
    public required string RefreshToken { get; init; }
}
public class ResendConfirmationEmailRequest {
    /// <summary>
    /// The email address to resend the confirmation email to if a user with that email exists.
    /// </summary>
    public required string Email { get; init; }
}
public class ForgotPasswordRequest {
    /// <summary>
    /// The email address to send the reset password code to if a user with that confirmed email address already exists.
    /// </summary>
    public required string Email { get; init; }
}
public class ResetPasswordRequest {
    /// <summary>
    /// The email address for the user requesting a password reset. This should match <see cref="ForgotPasswordRequest.Email"/>.
    /// </summary>
    public required string Email { get; init; }

    /// <summary>
    /// The code sent to the user's email to reset the password. To get the reset code, first make a "/forgotPassword" request.
    /// </summary>
    public required string ResetCode { get; init; }

    /// <summary>
    /// The new password the user with the given <see cref="Email"/> should login with. This will replace the previous password.
    /// </summary>
    public required string NewPassword { get; init; }
}
public class TwoFactorRequest {
    /// <summary>
    /// An optional <see cref="bool"/> to enable or disable the two-factor login requirement for the authenticated user. If null or unset,
    /// the current two-factor login requirement for the user will remain unchanged.
    /// </summary>
    public bool? Enable { get; init; }

    /// <summary>
    /// The two-factor code derived from the <see cref="TwoFactorResponse.SharedKey"/>. This is only required if <see cref="Enable"/> is set to <see langword="true"/>.
    /// </summary>
    public string? TwoFactorCode { get; init; }

    /// <summary>
    /// An optional <see cref="bool"/> to reset the <see cref="TwoFactorResponse.SharedKey"/> to a new random value if <see langword="true"/>.
    /// This automatically disables the two-factor login requirement for the authenticated user until it is re-enabled by a later request.
    /// </summary>
    public bool ResetSharedKey { get; init; }

    /// <summary>
    /// An optional <see cref="bool"/> to reset the <see cref="TwoFactorResponse.RecoveryCodes"/> to new random values if <see langword="true"/>.
    /// <see cref="TwoFactorResponse.RecoveryCodes"/> will be empty unless they are reset or two-factor was enabled for the first time.
    /// </summary>
    public bool ResetRecoveryCodes { get; init; }

    /// <summary>
    /// An optional <see cref="bool"/> to clear the cookie "remember me flag" if present. This has no impact on non-cookie authentication schemes.
    /// </summary>
    public bool ForgetMachine { get; init; }
}
public class TwoFactorResponse {
    /// <summary>
    /// The shared key generally for TOTP authenticator apps that is usually presented to the user as a QR code.
    /// </summary>
    public required string SharedKey { get; init; }

    /// <summary>
    /// The number of unused <see cref="RecoveryCodes"/> remaining.
    /// </summary>
    public required int RecoveryCodesLeft { get; init; }

    /// <summary>
    /// The recovery codes to use if the <see cref="SharedKey"/> is lost. This will be omitted from the response unless
    /// <see cref="TwoFactorRequest.ResetRecoveryCodes"/> was set or two-factor was enabled for the first time.
    /// </summary>
    public string[]? RecoveryCodes { get; init; }

    /// <summary>
    /// Whether or not two-factor login is required for the current authenticated user.
    /// </summary>
    public required bool IsTwoFactorEnabled { get; init; }

    /// <summary>
    /// Whether or not the current client has been remembered by two-factor authentication cookies. This is always <see langword="false"/> for non-cookie authentication schemes.
    /// </summary>
    public required bool IsMachineRemembered { get; init; }
}
public class InfoResponse {
    /// <summary>
    /// The email address associated with the authenticated user.
    /// </summary>
    public required string Email { get; init; }

    /// <summary>
    /// Indicates whether or not the <see cref="Email"/> has been confirmed yet.
    /// </summary>
    public required bool IsEmailConfirmed { get; init; }
}
public class InfoRequest {
    /// <summary>
    /// The optional new email address for the authenticated user. This will replace the old email address if there was one. The email will not be updated until it is confirmed.
    /// </summary>
    public string? NewEmail { get; init; }

    /// <summary>
    /// The optional new password for the authenticated user. If a new password is provided, the <see cref="OldPassword"/> is required.
    /// If the user forgot the old password, use the "/forgotPassword" endpoint instead.
    /// </summary>
    public string? NewPassword { get; init; }

    /// <summary>
    /// The old password for the authenticated user. This is only required if a <see cref="NewPassword"/> is provided.
    /// </summary>
    public string? OldPassword { get; init; }
}
