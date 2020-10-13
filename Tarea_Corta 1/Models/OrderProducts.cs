﻿using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class OrderProducts
    {
        public OrderProducts()
        {
        }

        public OrderProducts(int id)
        {
            Id = id;
        }

        public int IdOrder { get; set; }
        public int Quantity { get; set; }
        public int IdProduct { get; set; }
        public int Total { get; set; }
        public int Id { get; set; }

        public virtual Order IdOrderNavigation { get; set; }
        public virtual Products IdProductNavigation { get; set; }
    }
}
