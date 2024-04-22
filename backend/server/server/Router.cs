using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using server;

namespace server
{
    public class Router
    {
        private Dictionary<List<string>, Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, string, object>>> routes = new Dictionary<List<string>, Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, string, object>>>();

        public void AddRoute(string path, string method, Func<HttpListenerContext, Dictionary<string, string>, string, object> handler)
        {
            var segments = path.Split('/').Where(s => !string.IsNullOrEmpty(s)).ToList();
            if (!routes.ContainsKey(segments))
            {
                routes[segments] = new Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, string, object>>();
            }
            routes[segments][method] = handler;
        }

        private void LogRequestDetails(HttpListenerContext context)
        {
            Console.WriteLine("-----New Method----");
            Console.WriteLine($"Request URL: {context.Request.Url}");
            Console.WriteLine($"Request Method: {context.Request.HttpMethod}");
            Console.WriteLine($"--Header-- \n {context.Request.Headers}");
            Console.WriteLine($"------------");
        }

        public string ProcessRequest(HttpListenerContext context)
        {
            LogRequestDetails(context);

            var path = context.Request.Url.AbsolutePath;
            var method = context.Request.HttpMethod;
            string requestBody = null;

            // Always read the request body, regardless of the method
            requestBody = new StreamReader(context.Request.InputStream).ReadToEnd();

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
                        parameters[route.Key[i].Trim('{', '}')] = requestSegments[i];
                    }
                    else if (route.Key[i] != requestSegments[i])
                    {
                        match = false;
                        break;
                    }
                }

                if (match && route.Value.ContainsKey(method))
                {
                    var responseObject = route.Value[method](context, parameters, requestBody);
                    return JsonConvert.SerializeObject(responseObject);
                }
            }

            return JsonConvert.SerializeObject(new { message = "Unknown path or method" });
        }
    }
}
