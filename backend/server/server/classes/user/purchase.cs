using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.classes.user
{
    public class purchase
    {

        public List<itemcart> userCart {  get; set; }
        public int TotalPrice { get; set; }
        public string Address { get; set; }
        public string Date { get; set; } 
    }
}
