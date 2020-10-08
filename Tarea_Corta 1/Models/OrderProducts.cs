using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class OrderProducts
    {
        public int IdOrder { get; set; }
        public int Quantity { get; set; }
        public int IdProduct { get; set; }

        public virtual Order IdOrderNavigation { get; set; }
    }
}
