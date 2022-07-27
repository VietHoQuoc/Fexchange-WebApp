using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObject.Models;
using DataAccess.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using DataAccess.Paging;

namespace DataAccess.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly FExchangeContext context;
        public OrderRepository(FExchangeContext context)
        {
            this.context = context;
        }
        public void create(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
        }
        
        public PagedList<Order> findByPrice(int minprice, int maxprice, PagingParams p)
        {
            return new PagedList<Order>
                (context.Orders.Where(x => x.Price >= minprice && x.Price <= maxprice)
                    .Include(x => x.Buyer)
                    .Include(x => x.Product)
                    .Include(x => x.Product2).Skip((p.PageNumber - 1) * p.PageSize).Take(p.PageSize), 1, p.PageSize
                );
        }

        public PagedList<Order> findByRate(int rate, PagingParams p)
        {
            return new PagedList<Order>
                (context.Orders.Where(x => x.Rate >=rate )
                    .Include(x => x.Buyer)
                    .Include(x => x.Product)
                    .Include(x => x.Product2)
                    
                    .Skip((p.PageNumber - 1) * p.PageSize).Take(p.PageSize), p.PageNumber, p.PageSize
                );
        }

        public PagedList<Order> findByUserID(int userId, PagingParams p)
        {
            return new PagedList<Order>
                (context.Orders.Where(x => x.BuyerId == userId|| x.Product.AccountId == userId)
                    .Include(x => x.Buyer)
                    .Include(x => x.Product)
                    .Include(x => x.Product2).Skip((p.PageNumber - 1) * p.PageSize).Take(p.PageSize), p.PageNumber, p.PageSize
                );
        }

        public Order get(int id)
        {
            return context.Orders
                .Include(x => x.Buyer)
                    .Include(x => x.Product)
                    .Include(x => x.Product2)
                    
                .FirstOrDefault(x => x.Id == id);
        }

        public void update(Order order)
        {
            context.Orders.Update(order);
            context.SaveChanges();
        }
    }
}
