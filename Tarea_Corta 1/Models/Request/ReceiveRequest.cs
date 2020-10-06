using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public class ReceiveRequest
    {
        public int id { get; set; }
        public string customer_id { get; set; }
        public int product_id { get; set; }
        public int amount { get; set; }
        public List<Products> Products { get; set; }

        public ReceiveRequest()
        {
            this.Products = new List<Products>();
        }
    }

    public partial class Products
    {
        public string product { get; set; }
        public int stock { get; set; }
        public int price { get; set; }
        public string sales_mode { get; set; }
        public int category_id { get; set; }
    }

    public partial class Customers
    {
        public string name { get; set; }
        public string last_name { get; set; }
        public string address { get; set; }
        public string birth_date { get; set; }
        public int phone_number { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }

    }

}