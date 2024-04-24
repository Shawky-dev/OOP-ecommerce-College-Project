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
    public class customer : user, IIdentifiable, INameable, IAccountable
    {
        public static int IDGen = 0;
        public string Name
        {
            get;
            set;
        }
        public int ID
        {
            get;
            set;
        }
        public string Address
        {
            get;
            set;
        }
        public List<itemcart> userCart = new List<itemcart>();
        public List<purchase> userHistory = new List<purchase>();

        public void AddHistroy()
        {
            purchase newPurchase = new purchase()
            {
                userCart = userCart,
                TotalPrice = calculateCartPrice(),
                Date = DateTime.Now.ToString("MM/dd/yyyy h:mm tt"),
                Address = (string)Address
            };
            userHistory.Add(newPurchase);
            clearCart();
        }
        public int calculateCartPrice()
        {
            int price = 0;
            for (int i = 0; i < userCart.Count; i++)
            {
                price += userCart[i].price * userCart[i].quantity;
             

            }

            return price;
        }

        public void addItem(Item it)
        {

            for (int i = 0; i < userCart.Count; i++)
            {

                if (it.ID == userCart[i].ID)
                {
                    userCart[i].quantity++;
                    return;
                }

            }
            itemcart userItem = new itemcart()
            {
                ID = it.ID,
                quantity = 1,
                price = (int)it.Price,
                name = (string)it.Name,

            };
            userCart.Add(userItem);

        }
        public void removeItem(Item it)

        {
            for (int i = 0; i < userCart.Count; i++)
            {

                if (it.ID == userCart[i].ID)
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