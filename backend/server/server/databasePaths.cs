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

        public string ItemPath
        {
            get { return itemsPath; }
            set { itemsPath = Path.Combine(serverDirectory, value); }
        }

    }
}
