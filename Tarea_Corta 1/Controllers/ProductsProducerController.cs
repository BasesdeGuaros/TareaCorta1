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
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsProducerController : ControllerBase
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
                    var list = db.ProductsProducer
                        .Include(s => s.IdProducerNavigation)
                        .Include(s => s.IdProductNavigation)
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
        public IActionResult Put(ProductsProducerRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    ProductsProducer PP = new ProductsProducer(request.IdProduct);
                    PP.Quantity = request.Quantity;
                    PP.IdProducer = request.IdProducer;
                    PP.IdProduct = request.IdProduct;
                    //PP.Price = request.Price;


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
    }
       
}
