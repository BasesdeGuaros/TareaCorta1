using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Category
    {
        public Category()
        {
            Products = new HashSet<Products>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Products> Products { get; set; }
    }
}
