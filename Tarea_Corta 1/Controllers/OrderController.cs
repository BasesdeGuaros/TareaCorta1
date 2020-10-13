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
    public class OrderController : ControllerBase
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
                    var list = db.Order
                        .Include(s => s.IdCustomerNavigation)
                        .Include(s => s.OrderProducts)
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
        public IActionResult Post(OrderRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    Order order = new Order();
                    order.IdCustomer = request.IdCustomer;
                    order.Subtotal = request.Subtotal;
                    order.Tax = 0.0;
                    order.Total = 0.0;
                    order.IsActive = 1;
                    //order.IdCustomerNavigation = request.IdCustomerNavigation;
                    //order.OrderProducts

                    db.Order.Add(order);
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
        public IActionResult Put(OrderRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    Order order = new Order(request.Id);
                    order.Id = request.Id;
                    order.IdCustomer = request.IdCustomer;
                    order.Subtotal = request.Subtotal;
                    order.Tax = request.Tax;
                    order.Total = request.Total;
                    order.IsActive = request.isActive;
                    //order.IdCustomerNavigation = request.IdCustomerNavigation;


                    db.Entry(order).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
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
