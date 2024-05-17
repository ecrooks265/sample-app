using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

using SampleApp.Models.Entities.Identity;

namespace SampleApp.Models.VMs.Account
{
    #region Login
    public class LoginVM {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Display(
              Name = "Remember me?")]
        public bool? RememberMe { get; set; }
        public string? ExternalToken { get; set; }
    }
    #endregion
    #region UserVM
    public class UserVM {
        [EmailAddress]
        public string? Email { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? MembershipCode { get; set; }
        public string? StoreNumber { get; set; }

        public string? StoreName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Token { get; set; }
    }
    #endregion
    #region Register
    public class RegisterVM {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string? Email { get; set; }

        [Display(Name = "First Name")]
        public string? FirstName { get; set; }
        [Display(Name = "Last Name")]
        public string? LastName { get; set; }
        [Display(Name = "Address")]
        public string? Address1 { get; set; }
        [Display(Name = "Address")]
        public string? Address2 { get; set; }
        [Display(Name = "City")]
        public string? City { get; set; }
        [Display(Name = "State")]
        public string? State { get; set; }
        [Display(Name = "Postal Code")]
        public string? PostalCode { get; set; }
        //[Display(Name = "Membership number")]
        //public string? MembershipCode { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string? Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string? ConfirmPassword { get; set; }

        //[DataType(DataType.Text)]
        //[Display(Name = "Store Number")]
        //public string? StoreNumber { get; set; }

        //[DataType(DataType.Text)]
        //[Display(Name = "Store Name")]
        //public string? StoreName { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Phone Number")]
        public string? PhoneNumber { get; set; }

        //public DateTime? Modified { get; set; }
        //public Guid? Id { get; set; }
        //public bool? Deleted { get; set; }

        public string? Token { get; set; }
    }

    public static class RegisterVmExts {
        public static readonly Expression<Func<ApplicationUser, RegisterVM>> ToVmSql = (e) => new RegisterVM {
            Email = e.Email,
            FirstName = e.FirstName,
            LastName = e.LastName,
            //StoreName = e.StoreName,
            //StoreNumber = e.StoreNumber,
            Address1 = e.Address1,
            Address2 = e.Address2,
            City = e.City,
            State = e.State,
            PostalCode = e.PostalCode,
            //MembershipCode = e.MembershipCode,
            PhoneNumber = e.PhoneNumber,
            //Id = e.Id,
            //Modified = e.Modified ?? DateTime.Now,
            //Deleted = false
        };
        public static readonly Func<ApplicationUser, RegisterVM> ToVM = ToVmSql.Compile();
        public static RegisterVM AsVM(this ApplicationUser e) => ToVM(e);
        public static readonly Func<RegisterVM, ApplicationUser> ToPoco = (e) => {
            return new ApplicationUser {
                Email = e.Email,
                FirstName = e.FirstName,
                LastName = e.LastName,
                //StoreName = e.StoreName,
                //StoreNumber = e.StoreNumber,
                Address1 = e.Address1,
                Address2 = e.Address2,
                City = e.City,
                State = e.State,
                PostalCode = e.PostalCode,
                //MembershipCode = e.MembershipCode,
                PhoneNumber = e.PhoneNumber,
                //Id = e.Id ?? Guid.NewGuid(),
                //Modified = e.Modified ?? DateTime.Now,
            };
        };
        public static bool GraphVM(this RegisterVM vm, ref ApplicationUser e) {
            // Updates (ID == ID, Modified == Modified, Deleted == false
            /*
            if (e.Id == vm.Id && (e.Modified == null || e.Modified == vm.Modified) &&
              (vm.Deleted == null || vm.Deleted == false)) {
                if (e.Email != vm.Email) e.Email = vm.Email;
                if (e.FirstName != vm.FirstName) e.FirstName = vm.FirstName;
                if (e.LastName != vm.LastName) e.LastName = vm.LastName;
                if (e.StoreName != vm.StoreName) e.StoreName = vm.StoreName;
                if (e.StoreNumber != vm.StoreNumber) e.StoreNumber = vm.StoreNumber;
                if (e.Address1 != vm.Address1) e.Address1 = vm.Address1;
                if (e.Address2 != vm.Address2) e.Address2 = vm.Address2;
                if (e.City != vm.City) e.City = vm.City;
                if (e.State != vm.State) e.State = vm.State;
                if (e.PostalCode != vm.PostalCode) e.PostalCode = vm.PostalCode;
                if (e.MembershipCode != vm.MembershipCode) e.MembershipCode = vm.MembershipCode;
                if (e.PhoneNumber != vm.PhoneNumber) e.PhoneNumber = vm.PhoneNumber;
                e.Modified = DateTime.Now;
                return true;
            } */
            return false;
        }
    }
    #endregion
    #region Token
    public class TokenVM {
        public TokenVM() { }
        public string? token { get; set; }
        public DateTime? expiration { get; set; }
        public string? note { get; set; }
        public bool isSuccess { get; set; }
    }
    #endregion
    #region FeedbackModel
    public class FeedbackModel {
        public string message { get; set; } //Feedback for User
        public bool success { get; set; } //Indicates success with True or failure with False
        public string? type { get; set; } //The type of Feedback (ex. ResetPassword)
    }
    #endregion
    #region ExternalLoginVM
    public class ExternalLoginVM {
        public ExternalLoginVM() {
            Email = ""; Password = ""; RememberMe = false;
        }
        public string Email { get; set; }
        [DataType(
            DataType.Password)]
        public string Password { get; set; }

        [Display(
            Name = "Remember me?")]
        public bool RememberMe { get; set; }

        public string? ExternalToken { get; set; }
    }
    #endregion
    #region ExternalTokenVM
    public class ExternalTokenVM : TokenVM
    /*
     * Token VM for when the user logs in using external parties
     * ex. Google, Microsoft, Facebook, etc.
     * Object containing the valid token to be returned to the user, and the email used by google
     * Extends the base TokenVM class
     */
    {
        public string? email { get; set; }
    }
    #endregion
}
