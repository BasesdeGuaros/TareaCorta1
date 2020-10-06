using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarea_Corta_1.Models;
using Tarea_Corta_1.Models.Request;


namespace Tarea_Corta_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiveController : ControllerBase
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
                    var list = db.Receive.ToList(); //variable con la lista de datos de la tabla cliente
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
        public IActionResult Post(ReceiveRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    Receive receive = new Receive();
              
                    receive.Id = request.id;
                    receive.ProductId = request.product;
                    receive.Amount = request.totalPrice;

                    db.Receive.Add(receive);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Nuevo recivo";

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
