using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SampleApp.Models.Contexts;
using SampleApp.Models.Entities.Identity;
using SampleApp.Server.Models.Entities.Identity;
using SampleApp.Services.Account;
using SampleApp.Services;
using SampleApp.Server.Models.Entities;

namespace SampleApp
{
  public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var _config = builder.Configuration;

        #region Logging Configuration
        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();
        builder.Logging.AddDebug();
        #endregion

        #region Database Services
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection not found.");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString));
#if DEBUG
        builder.Services.AddDatabaseDeveloperPageExceptionFilter();
#endif
        #endregion

        #region Identity Services
        builder.Services.AddAuthentication(c => {
            c.DefaultAuthenticateScheme = IdentityConstants.BearerScheme;
            c.DefaultChallengeScheme = IdentityConstants.BearerScheme;
        })
        .AddBearerToken(IdentityConstants.BearerScheme);

        builder.Services.AddAuthorizationBuilder()
            .AddPolicy("api", p => {
                p.RequireAuthenticatedUser();
                p.AddAuthenticationSchemes(IdentityConstants.BearerScheme);
            });

        builder.Services.AddIdentityCore<ApplicationUser>(o => {
            o.SignIn.RequireConfirmedEmail = true;
            o.User.RequireUniqueEmail = true;
            o.Password.RequiredLength = 10;
            o.Password.RequiredUniqueChars = 8;
            o.Password.RequireLowercase = true;
            o.Password.RequireUppercase = true;
            o.Password.RequireDigit = false;
            o.Password.RequireNonAlphanumeric = false;
            o.User.AllowedUserNameCharacters = "abcçdefghiıjklmnoöpqrsştuüvwxyzABCÇDEFGHIİJKLMNOÖPQRSŞTUÜVWXYZ0123456789-._@+'#!/^%{}*";
        })
        .AddRoles<ApplicationRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddApiEndpoints();
        
        #endregion

        #region Standard Services
        builder.Services.AddHttpContextAccessor(); // Add IHttpContextAccessor here
        builder.Services.AddHttpClient();
        builder.Services.AddControllersWithViews();
        builder.Services.AddRazorPages();

        builder.Services.AddScoped<UserManager<ApplicationUser>>();
        builder.Services.AddScoped<SignInManager<ApplicationUser>>();

        builder.Services.AddTransient<Ganss.Xss.IHtmlSanitizer, Ganss.Xss.HtmlSanitizer>(
                         (_) => { return new Ganss.Xss.HtmlSanitizer(); });
        builder.Services.AddTransient<ILiquidTemplateProvider, LiquidTemplateProvider>();
        builder.Services.AddTransient<IEmailSender<ApplicationUser>, EmailTemplateSender<ApplicationUser>>();
        builder.Services.AddTransient<IEmailService, EmailService>();
        builder.Services.AddTransient<IDataEngineerSalaryService, DataEngineerSalaryService>();

        #region Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c => {
            c.EnableAnnotations();
        });
        #endregion

        #region Cors
        builder.Services.AddCors(o => {
            o.AddPolicy(name: "Default",
                b => {
                    b.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
        });
        #endregion

        #endregion

            var app = builder.Build();

            #region Configure App
            app.UseHttpsRedirection();

            // Configure the HTTP request pipeline.
            // TODO: add check for dev back in for production
            //if (app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
            //}

            app.UseRouting();
            app.UseCors("Default");

            app.UseAuthentication();  // Logins
            app.UseAuthorization();

            app.MapControllers();
            app.MapFallbackToFile("index.html");

            app.MapGroup("api/account")
                .MapIdentityApi<ApplicationUser>();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            #endregion

            app.Run();

    }
}


}
