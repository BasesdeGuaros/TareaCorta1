using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Receive
    {
        public int ReceiveId { get; set; }
        public string Customer { get; set; }
        public string Products { get; set; }
        public int Price { get; set; }
    }
}
