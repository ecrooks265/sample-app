using SampleApp.Models.Entities.Identity;
using System.Linq.Expressions;

namespace SampleApp.Models.VMs.Account;
public partial class BasicAppUserVM {
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    //public string? Address1 { get; set; }
    //public string? Address2 { get; set; }
    //public string? City { get; set; }
    //public string? State { get; set; }
    //public string? PostalCode { get; set; }
    //public string? UserName { get; set; }
    //public string? NormalizedUserName { get; set; }
    public string? Email { get; set; }
    //public string? NormalizedEmail { get; set; }
    //public bool EmailConfirmed { get; set; }
    //public string? PasswordHash { get; set; }
    //public string? SecurityStamp { get; set; }
    //public string? ConcurrencyStamp { get; set; }
    //public string? PhoneNumber { get; set; }
    //public bool PhoneNumberConfirmed { get; set; }
    //public bool TwoFactorEnabled { get; set; }
    //public DateTimeOffset? LockoutEnd { get; set; }
    //public bool LockoutEnabled { get; set; }
    //public int AccessFailedCount { get; set; }
}

public static class BasicAppUserVmExts {
    public static readonly Expression<Func<ApplicationUser, BasicAppUserVM>> ToVmSql = (e) => new BasicAppUserVM {
        Id = e.Id,
        FirstName = e.FirstName,
        LastName = e.LastName,
        //Address1 = e.Address1,
        //Address2 = e.Address2,
        //City = e.City,
        //State = e.State,
        //PostalCode = e.PostalCode,
        //UserName = e.UserName,
        //NormalizedUserName = e.NormalizedUserName,
        Email = e.Email
        //,NormalizedEmail = e.NormalizedEmail,
        //EmailConfirmed = e.EmailConfirmed,
        //PasswordHash = e.PasswordHash,
        //SecurityStamp = e.SecurityStamp,
        //ConcurrencyStamp = e.ConcurrencyStamp,
        //PhoneNumber = e.PhoneNumber,
        //PhoneNumberConfirmed = e.PhoneNumberConfirmed,
        //TwoFactorEnabled = e.TwoFactorEnabled,
        //LockoutEnd = e.LockoutEnd,
        //LockoutEnabled = e.LockoutEnabled,
        //AccessFailedCount = e.AccessFailedCount
    };
    public static readonly Func<ApplicationUser, BasicAppUserVM> ToVM = ToVmSql.Compile();
    public static BasicAppUserVM AsVMBasic(this ApplicationUser e) => ToVM(e);
    public static readonly Func<BasicAppUserVM, ApplicationUser> ToPoco = (e) => {
        return new ApplicationUser {
            Id = e.Id,
            FirstName = e.FirstName,
            LastName = e.LastName,
            //Address1 = e.Address1,
            //Address2 = e.Address2,
            //City = e.City,
            //State = e.State,
            //PostalCode = e.PostalCode,
            //UserName = e.UserName,
            //NormalizedUserName = e.NormalizedUserName,
            Email = e.Email
            //,NormalizedEmail = e.NormalizedEmail,
            //EmailConfirmed = e.EmailConfirmed,
            //PasswordHash = e.PasswordHash,
            //SecurityStamp = e.SecurityStamp,
            //ConcurrencyStamp = e.ConcurrencyStamp,
            //PhoneNumber = e.PhoneNumber,
            //PhoneNumberConfirmed = e.PhoneNumberConfirmed,
            //TwoFactorEnabled = e.TwoFactorEnabled,
            //LockoutEnd = e.LockoutEnd,
            //LockoutEnabled = e.LockoutEnabled,
            //AccessFailedCount = e.AccessFailedCount
        };
    };
    public static ApplicationUser AsPoco(this BasicAppUserVM e) => ToPoco(e);
    public static bool GraphVM(this BasicAppUserVM vm, ref ApplicationUser e) {
        // Updates (ID == ID, Modified == Modified, Deleted == false
        if (e.Id == vm.Id) {
            if (e.FirstName != vm.FirstName) e.FirstName = vm.FirstName;
            if (e.LastName != vm.LastName) e.LastName = vm.LastName;
            //if (e.Address1 != vm.Address1) e.Address1 = vm.Address1;
            //if (e.Address2 != vm.Address2) e.Address2 = vm.Address2;
            //if (e.City != vm.City) e.City = vm.City;
            //if (e.State != vm.State) e.State = vm.State;
            //if (e.PostalCode != vm.PostalCode) e.PostalCode = vm.PostalCode;
            //if (e.UserName != vm.UserName) e.UserName = vm.UserName;
            //if (e.NormalizedUserName != vm.NormalizedUserName) e.NormalizedUserName = vm.NormalizedUserName;
            if (e.Email != vm.Email) e.Email = vm.Email;
            //if (e.NormalizedEmail != vm.NormalizedEmail) e.NormalizedEmail = vm.NormalizedEmail;
            //if (e.EmailConfirmed != vm.EmailConfirmed) e.EmailConfirmed = vm.EmailConfirmed;
            //if (e.PasswordHash != vm.PasswordHash) e.PasswordHash = vm.PasswordHash;
            //if (e.SecurityStamp != vm.SecurityStamp) e.SecurityStamp = vm.SecurityStamp;
            //if (e.ConcurrencyStamp != vm.ConcurrencyStamp) e.ConcurrencyStamp = vm.ConcurrencyStamp;
            //if (e.PhoneNumber != vm.PhoneNumber) e.PhoneNumber = vm.PhoneNumber;
            //if (e.PhoneNumberConfirmed != vm.PhoneNumberConfirmed) e.PhoneNumberConfirmed = vm.PhoneNumberConfirmed;
            //if (e.TwoFactorEnabled != vm.TwoFactorEnabled) e.TwoFactorEnabled = vm.TwoFactorEnabled;
            //if (e.LockoutEnd != vm.LockoutEnd) e.LockoutEnd = vm.LockoutEnd;
            //if (e.LockoutEnabled != vm.LockoutEnabled) e.LockoutEnabled = vm.LockoutEnabled;
            //if (e.AccessFailedCount != vm.AccessFailedCount) e.AccessFailedCount = vm.AccessFailedCount;
            return true;
        }
        return false;
    }
}