using server.classes.user;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    public class admin : user, IIdentifiable, INameable, IAccountable
    {
        public static int IDGen = 0;
        public string Name { get; set; }
        public int ID { get; set; }

        public override string welcomeMsg()
        {
            return base.welcomeMsg() + Name;
        }



    }

}