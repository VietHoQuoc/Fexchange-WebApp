using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObject.Models;
using DataAccess.IRepository;
using Microsoft.EntityFrameworkCore;
using DataAccess.Paging;
using System.Linq.Expressions;

namespace DataAccess.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private FExchangeContext context;
        public CategoryRepository(FExchangeContext context)
        {
            this.context = context;
        }
        public void create(Category category)
        {
            context.Categories.Add(category);
            context.SaveChanges();
        }

        public Category get(int id)
        {
            return context.Categories
                .Include(x=> x.ExchangeDesires)
                .Include(x=> x.ProductPosts)
                .FirstOrDefault(x=> x.Id == id);
                
        }

        public PagedList<Category> getAll(Expression<Func<Category, bool>> ex,PagingParams p)
        {
            if (ex !=null) 
                return new PagedList<Category>
                (
                    context.Categories
                            .Include(x => x.ExchangeDesires)
                            .Include(x => x.ProductPosts)
                            .Where(ex),
                            p.PageNumber, p.PageSize
                );
            else
            {
                return new PagedList<Category>
                (
                    context.Categories
                            .Include(x => x.ExchangeDesires)
                            .Include(x => x.ProductPosts),
                            p.PageNumber, p.PageSize
                );
            }
        }

        public void update(Category category)
        {
            context.Categories.Update(category);
            context.SaveChanges();
        }
    }
}
