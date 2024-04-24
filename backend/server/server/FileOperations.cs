using Newtonsoft.Json;
using server;
using server.classes.user;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public class FileOperations
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

        if (!jsonString.Trim().StartsWith("[") || !jsonString.Trim().EndsWith("]"))
        {
            jsonString = $"[{jsonString}]";
        }

        var list = JsonConvert.DeserializeObject<List<T>>(jsonString);
        return list;
    }
    public static void AddObjectToFile<T>(T myObject, string filePath)
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

    public static void UpdateObjectsInFile<T>(List<T> objects, string filePath)
    {
        var updatedJsonString = JsonConvert.SerializeObject(objects, Formatting.Indented);
        File.WriteAllText(filePath, updatedJsonString);
    }

    public static T GetObjectByID<T>(int id, string filePath) where T : class, IIdentifiable
    {
        var allObjects = GetAllObjects<T>(filePath);
        var foundObject = allObjects.FirstOrDefault(obj => obj.ID == id);
        return foundObject;
    }

    public static void DeleteObjectByID<T>(int id, string filePath) where T : class, IIdentifiable
    {
        var allObjects = GetAllObjects<T>(filePath);
        var updatedObjects = allObjects.Where(obj => obj.ID != id).ToList();
        UpdateObjectsInFile(updatedObjects, filePath);

    }
    public static void ChangeObjectByID<T>(int id,T newObject,string filePath) where T : class, IIdentifiable
    {
        DeleteObjectByID<T>(id, filePath);
        AddObjectToFile<T>(newObject, filePath);

    }
    public static List<T> GetAllObjectsFromSearch<T>(string search, string filePath) where T : class, IIdentifiable, INameable
    {
        var allObjects = GetAllObjects<T>(filePath);
        var filteredObjects = allObjects.Where(obj => obj.Name.StartsWith(search, StringComparison.OrdinalIgnoreCase)).ToList();
        return filteredObjects;
    }

    public static T GetUserByEmail<T>(string Email, string filePath) where T : class,IAccountable
    { 

        var allObjects = GetAllObjects<T>(filePath);
        var foundObject = allObjects.FirstOrDefault(obj => obj._mail == Email);
        return foundObject;
    }
    public static object CheckUserPassword<T>(T customer, string password) where T:class,IAccountable,IIdentifiable
    {
        if (customer == null)
        {
            return new { 
                message = "customer with this email not Found", 
                code= "404"
            };

        }
        if(password == customer._pass) {
            return new
            {
                message = "correct passsword & email",
                code = "200",
                id = customer.ID
            };
        }
        else
        {
            return new
            {
                message = "incorrect passsword & email",
                code = "404",
            };
        }

    }
}

public interface IIdentifiable
{
    int ID { get; set; }

}
public interface INameable
{
    string Name { get; set; }
}
public interface IAccountable
{
    string _mail { get; set; }
    string _pass { get; set; }
}