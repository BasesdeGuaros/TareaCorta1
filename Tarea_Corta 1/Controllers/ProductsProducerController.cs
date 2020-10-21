using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tarea_Corta_1.Models;
using Tarea_Corta_1.Models.Request;

namespace Tarea_Corta_1.Controllers
{
    [ApiController]
    public class ProductsProducerController : ControllerBase
    {
        
        //IActionResult es una inteface
        [HttpGet] //protocolo get
        [Route("api/[controller]")]
        public IActionResult Get()
        {
            MyReply reply = new MyReply();
            try
            {
                //el codigo se elimina una vez ejecutado lo que tenga dentro del using()
                using (TareaCorta1Context db = new TareaCorta1Context()) //coneccion a la base de datos
                {
                    var list = db.ProductsProducer
                        .Include(s => s.IdProducerNavigation)
                        .Include(s => s.IdProductNavigation)
                        .Include(s => s.IdProductNavigation.Category)
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
        [Route("api/[controller]")]
        public IActionResult Post(ProductsProducerRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    ProductsProducer PP = new ProductsProducer();
                    PP.Quantity = request.Quantity;
                    PP.IdProducer = request.IdProducer;
                    PP.IdProduct = request.IdProduct;
                    PP.Price = request.Price;

                    db.ProductsProducer.Add(PP);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Orden agregada";

                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }

            return Ok(reply);
        }

        [HttpPut] //protocolo Put (editar)
        [Route("api/[controller]")]
        public IActionResult Put(ProductsProducerRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    ProductsProducer PP = new ProductsProducer(request.Id);
                    PP.Quantity = request.Quantity;
                    PP.Price = request.Price;
                    PP.Id = request.Id;
                    PP.IdProduct = request.IdProduct;
                    PP.IdProducer = request.IdProducer;


                    db.Entry(PP).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Orden editado";

                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }

            return Ok(reply);
        }

        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public IActionResult Delete(int id)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    ProductsProducer PP = new ProductsProducer(id);
                    db.Remove(PP);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Cliente eliminado";

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
