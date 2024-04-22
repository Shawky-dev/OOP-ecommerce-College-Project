using server;
using System.Net;
using System.Text;
using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

class Program
{
    public class MyObject : IIdentifiable
    {
        public int ID { get; set; }
    }

    static void Main(string[] args)
    {
        //database object to hold the txt file paths
        databasePaths Paths = new databasePaths();

        Paths.ItemPath = @"databaseFolder\items\items.txt";
        Console.WriteLine(Paths.ItemPath);

        //start up server
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/");
        listener.Start();
        Console.WriteLine("Listening...");
        //intialize router and adding PATHS with their method types (GET,POST,Etc.)for incoming requets

       


        Router router = new Router();
        router.AddRoute("/", "GET", (context, requestData) =>
        {

            return new { message2 = requestData };
        });
        router.AddRoute("/items", "GET", (context, requestData) =>
        {
            return FileOperations.GetAllObjects<Item>(Paths.ItemPath);
        });
        router.AddRoute("/items/{id}", "GET", (context, parameters) =>
        {
            int id = Int32.Parse(parameters["id"]);
            //use item id to GET
            return FileOperations.GetObjectByID<Item>(id, Paths.ItemPath);
            ;
        });
        router.AddRoute("/items/{id}", "DELETE", (context, parameters) =>
        {
            int id = Int32.Parse(parameters["id"]);
            //use item id to GET
            FileOperations.DeleteObjectByID<Item>(id,Paths.ItemPath);
            return new { message = $"Item {id} has been deleted" };
        });

        router.AddRoute("/items/{id}","PUT", (context, parameters) =>
        {

            return 0;
        });




        while (true)
        {
            HttpListenerContext context = listener.GetContext();
            HttpListenerRequest request = context.Request;
            HttpListenerResponse response = context.Response;

            string responseString = router.ProcessRequest(context);

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
