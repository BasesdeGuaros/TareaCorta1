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
    public class OrderProductsController : ControllerBase
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
                    var list = db.OrderProducts
                        .Include(s=> s.IdOrderNavigation)
                        .Include(s=> s.IdProductNavigation)
                        .ToList(); //variable con la lista de datos de la tabla 
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
        public IActionResult Post(OrderProductsRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    OrderProducts orderP = new OrderProducts();
                   // orderP.Id = request.Id;
                    orderP.IdOrder = request.IdOrder;
                    orderP.Quantity = request.Quantity;
                    orderP.IdProduct = request.IdProduct;
                    orderP.Total = request.Total;
                    //orderP.IdOrderNavigation = request.IdOrderNavigation;
                    //orderP.IdProductNavigation = request.IdProductNavigation;

                    db.OrderProducts.Add(orderP);
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
        public IActionResult Put(OrderProductsRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    OrderProducts orderP = new OrderProducts(request.IdOrder);
                    orderP.Id = request.Id;
                    orderP.IdOrder = request.IdOrder;
                    orderP.Quantity = request.Quantity;
                    orderP.IdProduct = request.IdProduct;
                    orderP.Total = request.Total;


                    db.Entry(orderP).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Orden de Productos editado";

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
