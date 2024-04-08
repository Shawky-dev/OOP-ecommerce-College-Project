using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace server
{
    public class Router
    {

        private Dictionary<string, Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, object>>> routes = new Dictionary<string, Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, object>>>();

        public void AddRoute(string path, string method, Func<HttpListenerContext, Dictionary<string, string>, object> handler)
        {
            if (!routes.ContainsKey(path))
            {
                routes[path] = new Dictionary<string, Func<HttpListenerContext, Dictionary<string, string>, object>>();
            }
            routes[path][method] = handler;
        }

        public string ProcessRequest(HttpListenerContext context)
        {
            var path = context.Request.Url.AbsolutePath;
            var method = context.Request.HttpMethod;

            if (routes.ContainsKey(path) && routes[path].ContainsKey(method))
            {
                // Use a switch case to handle different HTTP methods
                switch (method)
                {
                    case "GET":
                        // Handle GET request
                        var getResponseObject = routes[path][method](context, new Dictionary<string, string>());
                        return JsonConvert.SerializeObject(getResponseObject);

                    case "POST":
                        // Handle POST request
                        // Read the request body
                        var requestBody = new StreamReader(context.Request.InputStream).ReadToEnd();
                        // Parse the JSON string into a .NET object
                        var postRequestData = JsonConvert.DeserializeObject<Dictionary<string, string>>(requestBody);
                        var postResponseObject = routes[path][method](context, postRequestData);
                        return JsonConvert.SerializeObject(postResponseObject);

                    case "PUT":
                        // Handle PUT request
                        // Similar to POST, read and parse the request body
                        var putRequestBody = new StreamReader(context.Request.InputStream).ReadToEnd();
                        var putRequestData = JsonConvert.DeserializeObject<Dictionary<string, string>>(putRequestBody);
                        var putResponseObject = routes[path][method](context, putRequestData);
                        return JsonConvert.SerializeObject(putResponseObject);

                    case "DELETE":
                        // Handle DELETE request
                        var deleteResponseObject = routes[path][method](context, new Dictionary<string, string>());
                        return JsonConvert.SerializeObject(deleteResponseObject);

                    default:
                        return JsonConvert.SerializeObject(new { message = "Unknown method" });
                }
            }
            else
            {
                return JsonConvert.SerializeObject(new { message = "Unknown path or method" });
            }
        }
    }
}
