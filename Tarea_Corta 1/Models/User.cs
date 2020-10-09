using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public partial class User
    {
        public User()
        {
            Order = new HashSet<Order>();
            Producers = new HashSet<Producers>();
        }

        public int IdUser { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public int PhoneNumber { get; set; }
        public string BirthDate { get; set; }
        public string Rol { get; set; }

        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<Producers> Producers { get; set; }
    }
}
