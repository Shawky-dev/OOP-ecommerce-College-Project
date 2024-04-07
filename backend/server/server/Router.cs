using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    public class Router
    {
        private Dictionary<string, Func<HttpListenerContext, string>> routes = new Dictionary<string, Func<HttpListenerContext, string>>();

        public void AddRoute(string path, Func<HttpListenerContext, string> handler)
        {
            routes.Add(path, handler);
        }

        public string ProcessRequest(HttpListenerContext context)
        {
            var path = context.Request.Url.AbsolutePath;
            if (routes.ContainsKey(path))
            {
                return routes[path](context);
            }
            else
            {
                return "{\"message\":\"Unknown path\"}";
            }
        }
    }

}
