using server;
using System.Net;
using System.Text;
using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

class Program
{
    //FUNCTION TO ADD AND READ TXT FILES__________________
    //A function using generics that reutns a LIST<t> with all objects in the given txt file
    public static List<T> GetAllObjects<T>(string filePath)
    {
        string jsonString = "";
        if (File.Exists(filePath))
        {
            jsonString = File.ReadAllText(filePath);
        }

        // checkif the JSON data is an array of not turn int intoi an array
        if (!jsonString.Trim().StartsWith("[") || !jsonString.Trim().EndsWith("]"))
        {
            jsonString = $"[{jsonString}]";
        }

        // turn the Json array into a list
        var list = JsonConvert.DeserializeObject<List<T>>(jsonString);
        return list;
    }
    //a function using generics checks if a file exist then checks if 
    public void AddObjectToFile<T>(T myObject, string filePath)
    {
        string jsonString = "";
        if (File.Exists(filePath))
        {
            jsonString = File.ReadAllText(filePath);
        }

        //chgeck if the JSON data is an array of not turn int intoi an array
        if (!jsonString.Trim().StartsWith("[") || !jsonString.Trim().EndsWith("]"))
        {
            jsonString = $"[{jsonString}]";
        }

        //turn json into list
        var list = JsonConvert.DeserializeObject<List<T>>(jsonString);

        //add object to the list
        list.Add(myObject);

        //turn list back into JSON array
        var updatedJsonString = JsonConvert.SerializeObject(list, Formatting.Indented);

        //write the jsonarray back into the txt file
        File.WriteAllText(filePath, updatedJsonString);
    }



    static void Main(string[] args)
    {
        string itemsPATH = "D:\\gam3a\\OOPProject\\backend\\server\\server\\databaseFolder\\items\\items.txt";

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
            return GetAllObjects<Item>(itemsPATH);
        });
        router.AddRoute("/items/{id}", "GET", (context, parameters) =>
        {
            var id = parameters["id"];
            return new { message = $"Item {id} requested" };
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
