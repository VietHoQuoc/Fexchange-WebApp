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
    public class WishListRepository : IWishListRepository
    {
        private readonly FExchangeContext context;
        public WishListRepository(FExchangeContext fExchange)
        {
            context = fExchange;
        }
        public void Create(WishList wish)
        {
            context.WishLists.Add(wish);
            context.SaveChanges();
        }

        public void Delete(WishList wish)
        {
            WishList ws = context.WishLists.FirstOrDefault(x=> x.AccountId == wish.AccountId && x.ProductPostId == wish.ProductPostId);
            context.WishLists.Remove(ws);
            context.SaveChanges();
        }

        public List<WishList> GetByAccountId(int id, int pageNumber, int pageSize)
        {
            return context.WishLists.Where(w => w.AccountId == id)
                .Include(x=> x.Account)
                .Include(x=> x.ProductPost)
                .Include(x=> x.ProductPost.Category)
                .Include(x=> x.ProductPost.ProductImages)
                .Take(pageSize)
                .Skip(pageSize * (pageNumber - 1))
                .ToList();
        }

        public WishList GetById(int aid, int pid)
        {
            return context.WishLists.FirstOrDefault(x=> x.AccountId == aid && x.ProductPostId ==pid);
        }

        public List<WishList> GetByProductId(int id, int pageNumber, int pageSize)
        {
            return context.WishLists.Where(w => w.ProductPostId == id)
                .Include(x => x.Account)
                .Include(x => x.ProductPost)
                .Include(x => x.ProductPost.Category)
                .Include(x => x.ProductPost.ProductImages)
                .Take(pageSize)
                .Skip(pageSize * (pageNumber - 1))
                .ToList();
        }
    }
}
