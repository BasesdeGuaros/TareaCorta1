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
                    var products = db.Products.ToList();
                    reply.conexionSuccess = 1;
                    reply.data = products;
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
                    receive.ProductId = request.product_id;
                    receive.Amount = request.amount;
                    receive.CustomerId = request.customer_id;

                    db.Receive.Add(receive);
                    db.SaveChanges();

                    foreach (var requestProducts in request.Products)
                    {
                        var products = new Models.Products();
                        products.Product = requestProducts.Product;
                        products.Stock = requestProducts.Stock;
                        products.sales_mode = requestProducts.sales_mode;
                        products.Id = requestProducts.Id;
                        products.category_id = requestProducts.category_id;
                        db.Products.Add(products);
                        db.SaveChanges();
                    }
                    reply.conexionSuccess = 1;
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
