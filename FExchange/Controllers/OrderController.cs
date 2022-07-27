using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessObject.Models;
using FExchange.DTOs;
using AutoMapper;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;
using System.IO;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Hosting;
using System;
using Azure.Storage.Blobs.Models;
using DataAccess.IRepository;
using DataAccess.Repository;
using Microsoft.EntityFrameworkCore;
using DataAccess.Paging;
using Microsoft.AspNetCore.Authorization;
using FExchange.Models;
using System.Security.Claims;

namespace FExchange.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderRepository _orderRepository;
        private readonly IAccountRepository _accountRepository;
        private IMapper mapper;
        public OrderController(IMapper mapper, IOrderRepository orderRepository,IAccountRepository accountRepository) 
        { 
            this.mapper = mapper;
            _orderRepository = orderRepository;
            _accountRepository = accountRepository;
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public OrderDTO get(int id)
        {
            Order order = _orderRepository.get(id);
            return mapper.Map<OrderDTO>(order);
        }
        [HttpDelete("{id}")]
        public void delete(int id)
        {
        }
        [HttpGet("{pageNumber}/{pageSize}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public List<OrderDTO> search(int? BuyerID, bool all, int pageNumber, int pageSize)
        {
            PagingParams p = new PagingParams()
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };
            if (all)
            {
                return _orderRepository.findByRate(0,p).List.Select(o => mapper.Map<OrderDTO>(o)).ToList();
            }
            else
            {
                Dictionary<int, Order> dic = new Dictionary<int, Order>();
                if (BuyerID != null)
                {
                    List<Order> orders = _orderRepository.findByUserID((int)BuyerID, p).List;
                    foreach (Order order in orders) dic.Add(order.Id, order);
                }
                return dic.Values.Select(o => mapper.Map<OrderDTO>(o)).ToList();
            }
            
        }
        [HttpPost("")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public string create([FromBody]OrderDTO dto)
        {
            PagingParams pagingParams = new PagingParams()
            {
                PageNumber = 1,
                PageSize = 1,
            };
            Account account = _accountRepository.findAll(x => x.Id == dto.BuyerId, pagingParams).List.First();
            Account curAccount = GetCurrentUser();
            if (curAccount.Gmail != account.Gmail)
            {

                return "Authorize Fail";
            }
            Order order = mapper.Map<Order>(dto);
            order.Id = 0;
            order.CreatedDate = DateTime.Now;
            _orderRepository.create(order);
            return "OK";
        }
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public string update([FromRoute]int id,[FromBody] OrderDTO dto)
        {
            Order order = _orderRepository.get(id);
            PagingParams pagingParams = new PagingParams()
            {
                PageNumber = 1,
                PageSize = 1
            };
            Account account = _accountRepository.findAll(x => x.Id == dto.BuyerId, pagingParams).List.First();
            Account curAccount = GetCurrentUser();
            if (curAccount.Gmail != account.Gmail)
            {

                return "Authorize Fail";
            }
            if (dto.Feedback !=null) order.Feedback = dto.Feedback;
            if (dto.Price != null) order.Price = dto.Price;
            if(dto.Price2!=null) order.Price2 = dto.Price2;
            if (dto.Rate!=null)  order.Rate = dto.Rate;
            if (dto.Status !=null) order.Status = dto.Status; 
            _orderRepository.update(order);
            return "OK";
        }
        [HttpPut("feedback/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public string Feedback([FromRoute]int id,[FromBody] FeedBack feedBack)
        {
            Order order = _orderRepository.get(id);
            Account account = GetCurrentUser();
            account = _accountRepository.checkLogin(account.Gmail);
            if (account.Id != order.BuyerId)
            {
                return "You're not allowed";
            }
            order.Feedback = feedBack.Feedback;
            order.Rate = feedBack.Rate;
            _orderRepository.update(order);
            return "OK";
        }
        [HttpPut("myorder/{id}")]
        public void MyOrder(int id,string choice)
        {
            Order order = _orderRepository.get(id);
            if (choice == "Accept")
            {
                order.Status = "Accepted";
                Notification notification = new Notification()
                {
                    AccountId = order.Product2.AccountId,
                    CreatedDate = DateTime.Now,
                };
            }
            else
            {
                order.Status = "Declined";
            }
            _orderRepository.update(order);
        }
       
        private Account GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return new Account
                {
                    FullName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    Gmail = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                };
            }
            return null;
        }

    }
}
