using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.NetworkInformation;

namespace server
{

    internal class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int SellerId { get; set; }
        public decimal Price { get; set; }
        public string ImageBase64 { get; set; }

        public void AddObjectToFile(object myObject, string filePath)
        {
            string jsonString = "";
            if (File.Exists(filePath))
            {
                jsonString = File.ReadAllText(filePath);
            }

            // Check if the JSON string represents an array. If not, wrap it in an array.
            if (!jsonString.Trim().StartsWith("[") || !jsonString.Trim().EndsWith("]"))
            {
                jsonString = $"[{jsonString}]";
            }

            // Deserialize the JSON string into a list of Item objects.
            var list = JsonConvert.DeserializeObject<List<Item>>(jsonString);

            // Add the new object to the list.
            list.Add((Item)myObject);

            // Serialize the list back into a JSON string.
            var updatedJsonString = JsonConvert.SerializeObject(list, Formatting.Indented);

            // Write the updated JSON string back to the file.
            File.WriteAllText(filePath, updatedJsonString);
        }
        public List<Item> GettAllObjects(string filePath)
        {
            string jsonString = "";
            if (File.Exists(filePath))
            {
                jsonString = File.ReadAllText(filePath);
            }

            // Check if the JSON string represents an array. If not, wrap it in an array.
            if (!jsonString.Trim().StartsWith("[") || !jsonString.Trim().EndsWith("]"))
            {
                jsonString = $"[{jsonString}]";
            }

            // Deserialize the JSON string into a list of Item objects.
            var list = JsonConvert.DeserializeObject<List<Item>>(jsonString);
            return list;
        }

    }
}
