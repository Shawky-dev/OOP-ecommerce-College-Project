using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            using (StreamWriter file = File.AppendText(filePath))
            {
                string jsonString = JsonConvert.SerializeObject(myObject);
                file.WriteLine(jsonString);
            }
        }
    }
}
