using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tarea_Corta_1.Models;
using Tarea_Corta_1.Models.Reply;
using Tarea_Corta_1.Models.Request;

namespace Tarea_Corta_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProducersController : ControllerBase
    {
        //IActionResult es una inteface
        [HttpGet] //protocolo get
        public IActionResult Get()
        {
            MyReply reply = new MyReply();
            try
            {
                //el codigo se elimina una vez ejecutado lo que tenga dentro del using()
                using (TareaCorta1Context db = new TareaCorta1Context()) //coneccion a la base de datos
                {
                    var list = db.Producers
                        //.Include(s => s.Product)
                        .ToList(); //variable con la lista de datos de la tabla productores
                    reply.conexionSuccess = 1;
                    reply.data = list;
                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }
            return Ok(reply); //convierte la lista a Json
        }

        [HttpPost] //protocolo Post
        public IActionResult Post(ProducersRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    Producers producer = new Producers();

                    producer.Id = request.Id;
                    producer.Sinpe = request.Sinpe;
                    producer.IsAccepted = request.IsAccepted;
                    producer.IdProducer = request.IdProducer;
                    

                    db.Producers.Add(producer);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Productor agregado";

                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }

            return Ok(reply);
        }


    }
}
