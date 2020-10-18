using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tarea_Corta_1.Models.Reply
{
    /**
     * Modelo para la tabla de Producers
     */
    public class ProducersRequest
    {
        public int Id { get; set; }
        public int Sinpe { get; set; }
        public int IsAccepted { get; set; }


        public virtual User IdNavigation { get; set; }
    }
}
