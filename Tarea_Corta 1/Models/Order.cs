using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public int IdCustomer { get; set; }
        public int Subtotal { get; set; }
        public double Tax { get; set; }
        public double Total { get; set; }

        public virtual User IdCustomerNavigation { get; set; }
    }
}
