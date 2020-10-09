using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tarea_Corta_1.Models.Request
{
    public class UserRequest
    {
        public int IdUser { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public int PhoneNumber { get; set; }
        public string BirthDate { get; set; }
        public string Rol { get; set; }


    }
}
