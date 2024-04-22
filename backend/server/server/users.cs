using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    internal class users
    {
        public static int IDgen = 0;
        public int ID = 0;
        public string Name { get; set; }
        private string email;
        private string password;

        public void SetEmail(string mail)
        {
            email = mail;

        }        public void SetPassword(string pass)
        {
            password = pass;

        }
        public users(string n = "", string e = "", string p = "")
        {
            Name = n;
            email = e;
            password = p;
            ID = IDgen++;

        }
    }
}
