using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Producers
    {
        public Producers()
        {
            ProductsProducer = new HashSet<ProductsProducer>();
        }

        public int Id { get; set; }
        public int Sinpe { get; set; }
        public int IsAccepted { get; set; }
        public int IdProducer { get; set; }

        public virtual User IdNavigation { get; set; }
        public virtual ICollection<ProductsProducer> ProductsProducer { get; set; }
    }
}
