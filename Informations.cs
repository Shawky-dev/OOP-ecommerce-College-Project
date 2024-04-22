using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
    public class Informations
    {
    private string email ;
    private string password ;
    public string FirstName
    { get; set; }
    public string LastName
    { get; set; }
    public string phone
    { get; set; }
    public string city
    { get; set; }
    public Informations(string fn, string ln, string e, string p, string ph , string c)
    {
        FirstName = fn;
        LastName = ln;
        Email = e;
        Password = p;
        phone = ph;
        city = c ;
    }
    public string Email
    {
        get { return email; }
        set
        {
        email = value;
        }
    }
    public string Password
    {
        get { return password ; }
        set
        {
        password = value ;
        }
    }
    public virtual string Updatephone(List<string> BuyersPhone , string np)
    {
        int n = 0;
        while(n!=1)
        {
            for(int i = 0 ; i < BuyersPhone.Count; i++)
            {
                if(BuyersPhone[i] != np)
                {
                    n = 1 ;
                }
                 else
                { n = 0 ; }
            }
            if(n==0)
            {
                // when the buyer enter phone used ,should enter another one
            }
        }
        return np ;
    }
    public virtual string UpdateEmail(List<string> BuyersEmail , string ne)
    {
        int k = 0;
        while (k != 1)
        {
            for (int i = 0; i < BuyersEmail.Count; i++)
            {
                if (BuyersEmail[i] != ne)
                {
                    k = 1;
                }
                else
                { k = 0; }
            }
            if (k == 0)
            {
                // when the buyer enter email used ,should enter another one
            }
        }
        return ne;
    }
    public virtual string Updatepassword(List<string> BuyersPassword, string npw)
    {
        int l = 0;
        while (l != 1)
        {
            for (int i = 0; i < BuyersPassword.Count; i++)
            {
                if (BuyersPassword[i] != npw)
                {
                    l = 1;
                }
                else
                { l = 0; }
            }
            if (l == 0)
            {
                // when the buyer enter password used ,should enter another one
            }
        }
        return npw;
    }
    public virtual string UpdateCity(Buyer B , string c)
    {
        B.city = c ;
        return B.city ;
    }
    public override string ToString()
    {
        return $"{FirstName}\t{LastName}\t{Email}\t{Password}\t{phone}\t{city}" ;
    }
}