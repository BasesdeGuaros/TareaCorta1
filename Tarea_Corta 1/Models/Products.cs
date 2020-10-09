using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Products
    {
        public string Product { get; set; }
        public string SaleMode { get; set; }
        public int Id { get; set; }
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}
