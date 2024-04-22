using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    internal class customer:users
    {
        public List <itemcart> userCart;
        private string address;
        public void setUserAddress(string addr)
        {
            address = addr;


        }
        public void addItem(Item it)
        {
            if (userCart.Count == 0){
                itemcart userItem = new itemcart()
                {
                    id = it.ID,
                    quantity = 1

                };
                userCart.Add(userItem);
            }
            else
            {
                for (int i=0; i < userCart.Count; i++)
                {

                    if(it.ID == userCart[i].id)
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
    
    
    }
     
}
