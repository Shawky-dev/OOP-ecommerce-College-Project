using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
public class Buyer : Informations
{
    public Buyer(string fn, string ln, string e, string p, string ph, string c)
    : base(fn, ln, e, p, ph, c)
    { }
    static void Main(string[] args)
    {
        string filepath = @"C:\Users\omar\source\repos\OOP_Project\OOP_Project\BuyersList.txt";
        List<string> lines = new List<string>();
        List<string> BuyersPhone = new List<string>();
        List<string> BuyersEmail = new List<string>();
        List<string> BuyersPassword = new List<string>();
        List<Buyer> Buyers = new List<Buyer>();

        lines = File.ReadAllLines(filepath).ToList();
        foreach (string line in lines)
        {
            string[] b = line.Split(',');
            Buyer B = new Buyer(b[0], b[1], b[2], b[3], b[4], b[5]);
            BuyersEmail.Add(b[2]);
            BuyersPassword.Add(b[3]);
            BuyersPhone.Add(b[4]);
            Buyers.Add(B);
        }
        foreach (Buyer B in Buyers)
        {
            Console.WriteLine(B);
        }
    }
    public override string Updatephone( List <string> BuyersPhone, string np)
    {
        return base.Updatephone(BuyersPhone,np);
    }
    public override string UpdateEmail(List<string> BuyersEmail, string np)
    {
        return base.Updatephone(BuyersEmail, np);
    }
    public override string Updatepassword(List<string> BuyersPassword, string np)
    {
        return base.Updatephone(BuyersPassword, np);
    }
    public override string UpdateCity(Buyer B,string c)
    {
        return base.UpdateCity(B,c);
    }
    public override string ToString()
    {
        return base.ToString();
    }
}