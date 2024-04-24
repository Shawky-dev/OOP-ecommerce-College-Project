using server.classes.user;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    public class customer : user,IIdentifiable, INameable,IAccountable
    {
        public static int IDGen = 0;
        public string Name {  get; set; }
        public int ID {  get; set; }
        public string Address {  get; set; }
        public List<itemcart> userCart = new List<itemcart>();



        public void addItem(Item it)
        {
            if (userCart.Count == 0)
            {
                itemcart userItem = new itemcart()
                {
                    item = it,
                    quantity = 1

                };
                userCart.Add(userItem);
            }
            else
            {
                for (int i = 0; i < userCart.Count; i++)
                {

                    if (it.ID == userCart[i].item.ID)
                    {
                        userCart[i].quantity++;
                    }

                }

            }

        }
        public void removeItem(Item it)

        {

            if (userCart.Count == 0) return;

            for (int i = 0; i < userCart.Count; i++)
            {

                if (it.ID == userCart[i].item.ID)
                {
                    userCart[i].quantity--;
                    if (userCart[i].quantity == 0) userCart.RemoveAt(i);
                }

            }

        }
        public void clearCart()
        {

            userCart = new List<itemcart>();

        }
    }

}