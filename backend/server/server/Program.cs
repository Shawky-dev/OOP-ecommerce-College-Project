using server;
using System.Net;
using System.Text;
using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;

class Program
{

    static void Main(string[] args)
    {
        //database object to hold the txt file paths
        databasePaths Paths = new databasePaths();

        Paths.ItemPath = @"databaseFolder\items\items.txt";
        Paths.CustomerPath = @"databaseFolder\customers\customers.txt";

        //start up server
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/");
        listener.Start();
        Console.WriteLine("Listening...");
        //intialize router and adding PATHS with their method types (GET,POST,Etc.)for incoming requets




        Router router = new Router();
        //router ITEMS paths
        router.AddRoute("/items", "GET", (context, requestData, requestBody) =>
        {
            return FileOperations.GetAllObjects<Item>(Paths.ItemPath);
        });
        router.AddRoute("/items/{id}", "GET", (context, parameters, requestBody) =>
        {
            int id = Int32.Parse(parameters["id"]);
            //use item id to GET
            return FileOperations.GetObjectByID<Item>(id, Paths.ItemPath);

        });
        router.AddRoute("/items/{id}", "DELETE", (context, parameters, requestBody) =>
        {
            int id = Int32.Parse(parameters["id"]);
            //use item id to GET
            FileOperations.DeleteObjectByID<Item>(id, Paths.ItemPath);
            return new { message = $"Item with id:{id} has been deleted" };
        });

        router.AddRoute("/items/{id}", "PUT", (context, parameters, requestBody) =>
        {
            int id = Int32.Parse(parameters["id"]);

            var newobject = JsonConvert.DeserializeObject<Item>(requestBody);
            FileOperations.ChangeObjectByID<Item>(id, newobject, Paths.ItemPath);

            return new { message = $"Item has been changed" };
        });
        router.AddRoute("/newitem", "POST", (context, parameters, requestBody) =>
        {

            var newobject = JsonConvert.DeserializeObject<Item>(requestBody);
            FileOperations.AddObjectToFile<Item>(newobject, Paths.ItemPath);
            return new { message = $"Item has been added" };
        });


        router.AddRoute("/search/{id}", "GET", (context, parameters, requestBody) =>
        {
            var id = parameters["id"];
            if(id != "*")
            {
                return FileOperations.GetAllObjectsFromSearch<Item>(id, Paths.ItemPath);
            }
            else
            {
                
                return FileOperations.GetAllObjects<Item>(Paths.ItemPath);
            }

        });

        //Router customers
        router.AddRoute("/customers", "GET", (context, requestData, requestBody) =>
        {
            return FileOperations.GetAllObjects<customer>(Paths.CustomerPath);
        });
        router.AddRoute("/newCustomer", "POST", (context, parameters, requestBody) =>
        {

            var newobject = JsonConvert.DeserializeObject<customer>(requestBody);
            FileOperations.AddObjectToFile<customer>(newobject, Paths.CustomerPath);


            return new { message = $"user has been added" };
        });
        router.AddRoute("/customers/{id}", "GET", (context, parameters, requestBody) =>
        {
            int id = Int32.Parse(parameters["id"]);
            //use item id to GET
            return FileOperations.GetObjectByID<customer>(id, Paths.CustomerPath);

        });
        router.AddRoute("/customers/{id}", "DELETE", (context, parameters, requestBody) =>
        {
            int id = Int32.Parse(parameters["id"]);
            //use item id to GET
            FileOperations.DeleteObjectByID<customer>(id, Paths.CustomerPath);
            return new { message = $"Item with id:{id} has been deleted" };
        });

        router.AddRoute("/customers/{id}", "PUT", (context, parameters, requestBody) =>
        {
            int id = Int32.Parse(parameters["id"]);

            var newobject = JsonConvert.DeserializeObject<customer>(requestBody);
            FileOperations.ChangeObjectByID<customer>(id, newobject, Paths.CustomerPath);

            return new { message = $"Item has been changed" };
        });
        router.AddRoute("/authCustomer", "POST", (context, parameters, requestBody) =>
        {

            JObject jsonObject = JObject.Parse(requestBody);
            string email = jsonObject["Email"].ToString();
            string password = jsonObject["Password"].ToString();

            var customer = FileOperations.GetCustomerByEmail(email, Paths.CustomerPath);

            return FileOperations.CheckCustomerPassword(customer,password);
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
