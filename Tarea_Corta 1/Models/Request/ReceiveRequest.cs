using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class ReceiveRequest
    {
        public int id { get; set; }
        public string customerName { get; set; }
        public string product { get; set; }
        public int totalPrice { get; set; }
    }
}