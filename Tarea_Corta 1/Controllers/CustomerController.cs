using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarea_Corta_1.Models;
using Tarea_Corta_1.Models.Request;


/*
 * Hay que aprender a cambiar el datatype de la base de datos
 * Aprender a usar los diferentes datatypes de Sql y los casteos
 */
namespace Tarea_Corta_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
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
                    var list = db.Customers.ToList(); //variable con la lista de datos de la tabla cliente
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
        public IActionResult Post(ClientRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    Customers customer = new Customers();
                    customer.Id = request.id;
                    customer.Name = request.name;
                    customer.LastName = request.last_name;
                    customer.Address = request.address;
                    customer.BirthDate = request.birth_date;
                    customer.PhoneNumber = request.phone_number;
                    customer.UserName = request.user_name;
                    customer.Password = request.password;
                
                    db.Customers.Add(customer);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Cliente agregado";

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
        public IActionResult Put(ClientRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    Customers customer = db.Customers.Find(request.id);
                    customer.Id = request.id;
                    customer.Name = request.name;
                    customer.LastName = request.last_name;
                    customer.Address = request.address;
                    customer.BirthDate = request.birth_date;
                    customer.PhoneNumber = request.phone_number;
                    customer.UserName = request.user_name;
                    customer.Password = request.password;

                    db.Entry(customer).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Cliente editado";

                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }

            return Ok(reply);
        }

        [HttpDelete("{id}")] //protocolo Delete
        public IActionResult Delete(int id)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    Customers customer = db.Customers.Find(id);
                    db.Remove(customer);
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
