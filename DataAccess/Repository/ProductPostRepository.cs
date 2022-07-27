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
    public class ProductPostRepository : IProductPostRepository
    {
        private FExchangeContext context;
        public ProductPostRepository(FExchangeContext context)
        {
            this.context = context;
        }
        public int getMax()
        {
            return context.ProductPosts.Max(x=> x.Id);
        }
        public void create(ProductPost productPost)
        {
            context.ProductPosts.Add(productPost);
            context.SaveChanges();
        }
        public PagedList<ProductPost> findAll(int pageNumber, int pageSize)
        {
            var a = context.ProductPosts.Skip((pageNumber - 1) * pageSize).Take(pageSize)
                .Include(x => x.Account)
                    .Include(x => x.Category)
                    .Include(x => x.ExchangeDesires)
                    .Include(x => x.ProductImages);

            return new PagedList<ProductPost>(
                    a, 1,100);
        }
        public void delete(int id)
        {
            ProductPost productPost = get(id);
            productPost.Status = "Inactive";
            context.ProductPosts.Update(productPost);
            context.SaveChanges();
        }

        public PagedList<ProductPost> findByAccountID(int accountID, int pageNumber, int pageSize)
            => new PagedList<ProductPost>(
                context.ProductPosts
                    
                    .Where(x=> x.AccountId == accountID)
                    .Include(x => x.Account)
                    .Include(x => x.Category)
                    .Include(x => x.ExchangeDesires)
                .Include(x => x.ProductImages)
                ,
                pageNumber, pageSize);
                

        public PagedList<ProductPost> findByCategoryID(int categoryID, int pageNumber, int pageSize)
                => new PagedList<ProductPost>(
                context.ProductPosts
                    .Include(x => x.Account)
                    .Include(x => x.Category.Category1)
                    .Include(x => x.ExchangeDesires.Count)
                    .Include(x => x.ProductImages)
                    .Where(x=> x.CategoryId == categoryID)
                    ,
                pageNumber, pageSize);

        public ProductPost get(int id)
        {
            return context.ProductPosts
                .Include(x => x.Account)
                    .Include(x => x.Category)
                    .Include(x => x.ExchangeDesires)
                    .Include(x => x.ProductImages)
                .FirstOrDefault(x=>x.Id == id);
        }

        public void update(ProductPost productPost)
        {
           
            context.ProductPosts.Update(productPost);
            context.SaveChanges();
        }
    }
}
