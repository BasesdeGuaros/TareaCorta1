using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tarea_Corta_1.Models.Request
{
    public class ProductsRequest
    {

        public string Product { get; set; }
        public string SaleMode { get; set; }
        public int Id { get; set; }
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<OrderProducts> OrderProducts { get; set; }
        public virtual ICollection<ProductsProducer> ProductsProducer { get; set; }
    }
}
