using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    internal class databasePaths
    {
        string serverDirectory = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), @"..\.."));
        string itemsPath;
        string customerPath;
        string adminPath;

        public string ItemPath
        {
            get { return itemsPath; }
            set { itemsPath = Path.Combine(serverDirectory, value); }
        }
        public string CustomerPath
        {
            get { return customerPath; }
            set { customerPath = Path.Combine(serverDirectory, value); }
        }
        public string AdminPath
        {
            get { return adminPath; }
            set { adminPath = Path.Combine(serverDirectory, value); }
        }
    }
}
