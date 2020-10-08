using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public int IdCustomer { get; set; }
        public int IdProduct { get; set; }

        public virtual Customers IdCustomerNavigation { get; set; }
        public virtual Products IdProductNavigation { get; set; }
    }
}
