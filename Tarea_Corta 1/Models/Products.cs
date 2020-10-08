using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Products
    {
        public Products()
        {
            Order = new HashSet<Order>();
        }

        public string Product { get; set; }
        public int Price { get; set; }
        public string SaleMode { get; set; }
        public int Id { get; set; }
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Order> Order { get; set; }
    }
}
