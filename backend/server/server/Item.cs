using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.NetworkInformation;
using static Program;

namespace server
{
    internal class Item : IIdentifiable, INameable
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int SellerId { get; set; }
        public decimal Price { get; set; }
        public string ImageBase64 { get; set; }

        // Override the ToString method
        public override string ToString()
        {
            // Use string interpolation to create a string representation of the Item object
            return $"ID: {ID}\n Name: {Name}\n Description: {Description}\n Category: {Category}\n SellerId: {SellerId}\n Price: {Price}\n ImageBase64: {ImageBase64}";
        }
    }
}
