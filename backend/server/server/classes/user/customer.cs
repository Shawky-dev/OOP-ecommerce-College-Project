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
        private string Address;
        public string addressProperty
        {

            get
            {

                return Address;
            }
            set
            {
                Address = value;
            }


        }
        public List<itemcart> userCart;



        public void addItem(Item it)
        {
            if (userCart.Count == 0)
            {
                itemcart userItem = new itemcart()
                {
                    id = it.ID,
                    quantity = 1

                };
                userCart.Add(userItem);
            }
            else
            {
                for (int i = 0; i < userCart.Count; i++)
                {

                    if (it.ID == userCart[i].id)
                    {
                        userCart[i].quantity++;
                    }

                }

            }

        }
        public void RemQuan(Item it)

        {

            if (userCart.Count == 0) return;

            for (int i = 0; i < userCart.Count; i++)
            {

                if (it.ID == userCart[i].id)
                {
                    userCart[i].quantity--;
                    if (userCart[i].quantity == 0) userCart.RemoveAt(i);
                }

            }

        }
        public void clearCart()
        {

            userCart = null;

        }
        public override string welcomeMsg()
        {
            return base.welcomeMsg() + Name;
        }
    }

}