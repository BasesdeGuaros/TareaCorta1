using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Stock
    {
        public int? Quantity { get; set; }
        public int IdProduct { get; set; }
        public int IdProducer { get; set; }

        public virtual Producers IdProducerNavigation { get; set; }
        public virtual Products IdProductNavigation { get; set; }
    }
}
