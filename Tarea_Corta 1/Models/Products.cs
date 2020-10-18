using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Products
    {
        public Products()
        {
            OrderProducts = new HashSet<OrderProducts>();
            ProductsProducer = new HashSet<ProductsProducer>();
        }

        public string Product { get; set; }
        public string SaleMode { get; set; }
        public int Id { get; set; }
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<OrderProducts> OrderProducts { get; set; }
        public virtual ICollection<ProductsProducer> ProductsProducer { get; set; }
    }
}
