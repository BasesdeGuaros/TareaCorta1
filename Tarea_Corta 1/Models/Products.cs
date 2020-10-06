﻿using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Products
    {
        public Products()
        {
            Producers = new HashSet<Producers>();
            Receive = new HashSet<Receive>();
        }

        public string Product { get; set; }
        public int Stock { get; set; }
        public int Price { get; set; }
        public string SaleMode { get; set; }
        public int Id { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Producers> Producers { get; set; }
        public virtual ICollection<Receive> Receive { get; set; }
    }
}
