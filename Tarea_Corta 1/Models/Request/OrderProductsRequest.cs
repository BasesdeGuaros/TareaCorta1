using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tarea_Corta_1.Models.Request
{
  
    public class OrderProductsRequest
    {
        public int IdOrder { get; set; }
        public int Quantity { get; set; }
        public int IdProduct { get; set; }
        public int Total { get; set; }
        public int Id { get; set; }

        public virtual Order IdOrderNavigation { get; set; }
        public virtual Products IdProductNavigation { get; set; }
    }
}
