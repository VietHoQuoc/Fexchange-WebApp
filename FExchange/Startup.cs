using AutoMapper;
using FExchange.Mapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.IRepository;
using DataAccess.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FExchange.Services;
using BusinessObject.Models;
using Microsoft.EntityFrameworkCore;

namespace FExchange
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            //Tao mapper
            IMapper mapper = config.CreateMapper();
            services.AddSingleton(mapper);


            services.AddScoped<IAccountRepository>(x =>
                new AccountRepository(x.GetRequiredService<FExchangeContext>()));


            services.AddScoped<ICategoryRepository>(
                x=> new CategoryRepository(x.GetRequiredService<FExchangeContext>())); 


            services.AddScoped<IExchangeDesireRepository>(
                x=> new ExchangeDesireRepository(x.GetRequiredService<FExchangeContext>()));


            services.AddScoped<INotificationRepository>(
                x=> new NotificationRepository(x.GetRequiredService<FExchangeContext>()));


            services.AddScoped<IProductPostRepository>(
                x=> new ProductPostRepository(x.GetRequiredService<FExchangeContext>()));


            services.AddScoped<IOrderRepository>(
                x=> new OrderRepository(x.GetRequiredService<FExchangeContext>())); 


            services.AddScoped<IProductImageRepository>(
                x=> new ProductImageRepository(x.GetRequiredService<FExchangeContext>()));

            services.AddScoped<IWishListRepository>(
                x => new WishListRepository(x.GetRequiredService<FExchangeContext>()));

            services.AddScoped<IWishListService>(
                x => new WishListService(x.GetRequiredService<IWishListRepository>()
                                        , x.GetRequiredService<IMapper>()));
                
            services.AddDbContext<FExchangeContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("Conn"))) ;

            //services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<IAuthService>(x => new AuthService(x.GetRequiredService<IAccountRepository>()));

            services.AddCors(
                options =>
                {
                    options.AddDefaultPolicy(
                         builder => builder
                                    .AllowAnyMethod()
                                    .AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    
                         );
                         
                }
                );
            //string key = Configuration["AppSettings:JwtSecret"];
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)


                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["AppSettings:JwtSecret"]))
                    };
                });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FExchange", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FExchange v1"));
            }
            else
            {

                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FExchange v1"));
            }
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
