using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using System.Text;

namespace TicketApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<TicketApp.IService.IDapper, TicketApp.Service.Dapper>();
            services.AddTransient<TicketApp.IService.ILogin, TicketApp.Service.Login>();
            services.AddTransient<TicketApp.IService.ITicket, TicketApp.Service.Ticket>();
        
            services.AddControllersWithViews();
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
       
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseSwagger();
            app.UseCors(builder => builder
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowAnyOrigin()
            );
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI(v1)");
            });
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            app.UseAuthentication();
        }
    }
}
