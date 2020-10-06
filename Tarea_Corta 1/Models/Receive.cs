using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Receive
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int Amount { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual Products Product { get; set; }
    }
}
