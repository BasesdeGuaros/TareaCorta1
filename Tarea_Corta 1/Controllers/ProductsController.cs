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
    public class ProductsController : ControllerBase
    {
        /**
         *  Protocolo get
         *  IActionResult es una inteface
         *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
         */
        [HttpGet]
        public IActionResult Get()
        {
            MyReply reply = new MyReply();
            try
            {
                //el codigo se elimina una vez ejecutado lo que tenga dentro del using()
                using (TareaCorta1Context db = new TareaCorta1Context()) //coneccion a la base de datos
                {
                    var list = db.Products
                        .Include(s => s.Category)
                        .Include(s => s.OrderProducts)
                        .Include(s => s.ProductsProducer)
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
        /**
         * Protocolo Post
         * 
         */
        [HttpPost]
        public IActionResult Post(ProductsRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    Products products = new Products();
                    products.CategoryId = request.CategoryId;
                    products.SaleMode = request.SaleMode;
                    products.Id = request.Id;
                    products.Product = request.Product;

                    db.Products.Add(products);
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
    }
}
