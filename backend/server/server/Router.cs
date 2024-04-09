using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace server
{
    public class Router
    {
        private Dictionary<List<string>, Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, object>>> routes = new Dictionary<List<string>, Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, object>>>();

        public void AddRoute(string path, string method, Func<HttpListenerContext, Dictionary<string, string>, object> handler)
        {
            var segments = path.Split('/').Where(s => !string.IsNullOrEmpty(s)).ToList();
            if (!routes.ContainsKey(segments))
            {
                routes[segments] = new Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, object>>();
            }
            routes[segments][method] = handler;
        }

        public string ProcessRequest(HttpListenerContext context)
        {
            var path = context.Request.Url.AbsolutePath;
            var method = context.Request.HttpMethod;
            string rawData = null;

            switch (method)
            {
                case "GET":
                    break;

                case "POST":
                case "PUT":
                    rawData = new StreamReader(context.Request.InputStream).ReadToEnd();
                    break;

                case "DELETE":
                    break;

                default:
                    return JsonConvert.SerializeObject(new { message = "Unknown method" });
            }

            var requestSegments = path.Split('/').Where(s => !string.IsNullOrEmpty(s)).ToList();
            foreach (var route in routes)
            {
                if (route.Key.Count != requestSegments.Count) continue;

                var parameters = new Dictionary<string, string>();
                bool match = true;
                for (int i = 0; i < route.Key.Count; i++)
                {
                    if (route.Key[i].StartsWith("{") && route.Key[i].EndsWith("}"))
                    {
                        // This is a parameter, store its value
                        parameters[route.Key[i].Trim('{', '}')] = requestSegments[i];
                    }
                    else if (route.Key[i] != requestSegments[i])
                    {
                        // This segment does not match, break the loop
                        match = false;
                        break;
                    }
                }

                if (match && route.Value.ContainsKey(method))
                {
                    var responseObject = route.Value[method](context, parameters);
                    return JsonConvert.SerializeObject(responseObject);
                }
            }

            return JsonConvert.SerializeObject(new { message = "Unknown path or method" });
        }
    }
}
