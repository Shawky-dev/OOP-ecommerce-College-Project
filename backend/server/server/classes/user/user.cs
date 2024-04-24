using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.classes.user
{
    public class user
    {
        private string Password;
        private string Email;
        public string _pass
        {
            get
            {
                return Password;
            }
            set
            {
                Password = value;
            }

        }
        public string _mail
        {
            get
            {
                return Email;
            }
            set
            {
                Email = value;
            }

        }
        public string ProfilePictureBase64 { get; set; }
    }
}