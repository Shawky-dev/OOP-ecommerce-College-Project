using System.Net;
using System.Text;
using System;

class Program
{
    static void Main(string[] args)
    {
        if (!HttpListener.IsSupported)
        {
            Console.WriteLine("Windows XP SP2 or Server 2003 is required to use the HttpListener class.");
            return;
        }

        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/");
        listener.Start();
        Console.WriteLine("Listening...");

        while (true)
        {
            HttpListenerContext context = listener.GetContext();
            HttpListenerRequest request = context.Request;
            HttpListenerResponse response = context.Response;

            string responseString;
            switch (request.Url.AbsolutePath)
            {
                case "/":
                    responseString = "{\"message\":\"Hello from /\"}";
                    break;
                case "/data":
                    responseString = "{\"message\":\"Hello from /data\"}";
                    break;
                case "/posts":
                    responseString = "{\"message\":\"Hello from /posts\"}";
                    break;
                default:
                    responseString = "{\"message\":\"Unknown path\"}";
                    break;
            }

            byte[] buffer = Encoding.UTF8.GetBytes(responseString);

            response.ContentType = "application/json";
            response.ContentLength64 = buffer.Length;

            // Add CORS headers to allow cross-origin requests
            response.AddHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
            response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow specific methods
            response.AddHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

            System.IO.Stream output = response.OutputStream;
            output.Write(buffer, 0, buffer.Length);
            output.Close();
        }
    }
}
