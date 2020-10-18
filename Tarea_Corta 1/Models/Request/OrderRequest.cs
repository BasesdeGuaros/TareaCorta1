using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tarea_Corta_1.Models.Request
{
    /**
     * Modelo para la tabla de Orden
     */
    public class OrderRequest
    {
        public int Id { get; set; }
        public int IdCustomer { get; set; }
        public int Subtotal { get; set; }
        public double Tax { get; set; }
        public double Total { get; set; }
        public int isActive { get; set; }
        public virtual User IdCustomerNavigation { get; set; }
        public virtual ICollection<OrderProducts> OrderProducts { get; set; }
    }
}
