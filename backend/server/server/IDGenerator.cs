using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    public static class IDGenerator
    {
        public static int GenerateUniqueID<T>(List<T> allObjects) where T : IIdentifiable
        {
            int newID = 1; // Assuming IDs start from 1
            while (allObjects.Any(obj => obj.ID == newID))
            {
                newID++;
            }
            return newID;
        }
    }


}
