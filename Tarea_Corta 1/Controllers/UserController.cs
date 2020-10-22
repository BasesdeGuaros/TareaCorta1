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
    public class UserController : ControllerBase
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
                    var list = db.User
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

        [HttpGet] //protocolo get
        [Route("api/userproducer")]
        public IActionResult GetProd(string rol)
        {
            MyReply reply = new MyReply();
            try
            {
                //el codigo se elimina una vez ejecutado lo que tenga dentro del using()
                using (TareaCorta1Context db = new TareaCorta1Context()) //coneccion a la base de datos
                {
                    var list = db.User
                        .Where(a => a.Rol == "producer")
                        .Include(a => a.Producers)
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
        [Route("api/[controller]")]
        public IActionResult Post(UserRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    User user = new User();
                    user.IdUser = request.IdUser;
                    user.Name = request.Name;
                    user.LastName = request.LastName;
                    user.Address = request.Address;
                    user.BirthDate = request.BirthDate;
                    user.PhoneNumber = request.PhoneNumber;
                    user.Username = request.Username;
                    user.Password = request.Password;
                    user.Rol = request.Rol;

                    db.User.Add(user);
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
        [Route("api/[controller]")]
        public IActionResult Put(UserRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    User user = db.User.Find(request.IdUser);
                    user.IdUser = request.IdUser;
                    user.Name = request.Name;
                    user.LastName = request.LastName;
                    user.Address = request.Address;
                    user.BirthDate = request.BirthDate;
                    user.PhoneNumber = request.PhoneNumber;
                    user.Username = request.Username;
                    user.Password = request.Password;

                    db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
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


        //[HttpDelete("{id}")] //protocolo Delete
        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public IActionResult Delete(int id)
        {
            MyReply reply = new MyReply();

            try
            {
                using (TareaCorta1Context db = new TareaCorta1Context())
                {
                    User user = db.User.Find(id);
                    db.Remove(user);
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