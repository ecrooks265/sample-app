using DotLiquid;

namespace SampleApp.Server.Services.Middleware
{
    public interface ILiquidTemplateProvider
    {
        string RenderTemplate(string template, object model);
    }



    public class LiquidTemplateProvider : ILiquidTemplateProvider
    {
        public string RenderTemplate(string template, object model)
        {
            //accepts a template and model to populate user data to make personalized message
            var liquidTemplate = Template.Parse(template);
            return liquidTemplate.Render(Hash.FromAnonymousObject(model));
        }
    }

}
