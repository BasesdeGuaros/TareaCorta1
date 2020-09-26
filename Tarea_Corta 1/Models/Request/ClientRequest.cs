using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tarea_Corta_1.Models.Request
{
    public class ClientRequest
    {
        public int id { get; set; }
        public string name { get; set; }
        public string last_name { get; set; }
        public string address { get; set; }
        public string birth_date { get; set; }
        public int phone_number { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }

    }
}
