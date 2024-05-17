using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace SampleApp.Services.Misc
{
    public static class Spec
    {
        static public void CopyProperties(object source, object target)
        {
            if (target != null && source != null)
            {
                var customType = target.GetType();
                foreach (var prop in source.GetType().GetProperties())
                {
                    var propGetter = prop.GetGetMethod();
                    var propName = customType.GetProperty(prop.Name);
                    if (propName != null && propGetter != null)
                    {
                        var propSetter = propName.GetSetMethod();
                        var valueToSet = propGetter.Invoke(source, null);
                        // propName has the target and prop has the source
                        if (propName.PropertyType.FullName.Contains("System.String") &&
                            valueToSet != null &&
                            valueToSet.GetType().FullName.Contains("System.DateTime"))
                        {
                            // changing from DateTime to String
                            propSetter.Invoke(target, new[]
                            {   valueToSet == null
                                ? (string) null
                                : ((DateTime) valueToSet).ToShortDateString()
                            });
                        }
                        else if (propName.PropertyType.FullName.Contains("System.DateTime") &&
                            valueToSet != null &&
                            valueToSet.GetType().FullName.Contains("System.String"))
                        {   // changing from string to DateTime
                            propSetter.Invoke(target, new[]
                            {
                                valueToSet == null
                                ? (object) ((DateTime?) null)
                                : (object) ((DateTime?) Convert.ToDateTime((String) valueToSet))
                            });
                        }
                        else
                            propSetter.Invoke(target, new[] { valueToSet });
                    }
                }
            }
        }
    }
}
