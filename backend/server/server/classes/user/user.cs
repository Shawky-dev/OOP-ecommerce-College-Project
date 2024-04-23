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
        public string Password {  get; set; }
        public string Email {  get; set; }
        public string ProfilePictureBase64 {  get; set; }
        public virtual string welcomeMsg()
        {



            return "Welcome! ";
        }
 

    }
}
