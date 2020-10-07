using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Tarea_Corta_1
{

    //Para hacer la conexion a la base de datos en el Nuget Console
    //Scaffold-DBContext "Server=localhost; Database=TareaCorta1; Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models

    //Para hacer update a la base de datos, cuando se cambia una opcion en Sql
    //Scaffold-DbContext -Connection "Server=localhost; Database=TareaCorta1; Trusted_Connection=True;" -Provider Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -context TareaCorta1Context -force

    public class Startup
    {
        readonly string myCors = "myCors";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //permitir el acceso de Web Services
            services.AddCors(options =>
            {
                options.AddPolicy(name: myCors,
                    builder =>
                    {
                        builder.WithHeaders("*"); // aceptar metodo post
                        builder.WithOrigins("*"); // * => a cualquier dominio
                        builder.WithMethods("*"); // permite todos los metodos
                    });
            });
                services.AddControllersWithViews();
                // In production, the Angular files will be served from this directory
                services.AddSpaStaticFiles(configuration =>
                {
                    configuration.RootPath = "ClientApp/dist";
                });
            services.AddControllers().AddNewtonsoftJson(options => //anadir dependencia newtonsoft.jason y agregar este par de lineas para obtener info de las llaves foraneas
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //anadir, configurar cors
            app.UseCors(myCors);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");

                }
            });
        }
    }
}
