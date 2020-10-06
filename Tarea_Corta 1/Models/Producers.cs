using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class Producers
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Birthdate { get; set; }
        public int Phone { get; set; }
        public int Sinpe { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int? ProductId { get; set; }

        public virtual Products Product { get; set; }
    }
}
