using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tarea_Corta_1.Models.Request
{
    /**
     * Modelo para la tabla de Products_Procucer
     */
    public class ProductsProducerRequest
    {
        public int? Quantity { get; set; }
        public int IdProduct { get; set; }
        public int IdProducer { get; set; }
        public int Price { get; set; }

        public virtual Producers IdProducerNavigation { get; set; }
        public virtual Products IdProductNavigation { get; set; }
    }
}
