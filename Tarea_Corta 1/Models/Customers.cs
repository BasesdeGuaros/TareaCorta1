using System;
using System.Collections.Generic;

namespace Tarea_Corta_1.Models
{
    public class Customers
    {
        public Customers()
        {
            ReceiveNavigation = new HashSet<Receive>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string BirthDate { get; set; }
        public int PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Receive { get; set; }

        public virtual ICollection<Receive> ReceiveNavigation { get; set; }
    }
}
