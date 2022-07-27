using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObject.Models;
using DataAccess.IRepository;
using Microsoft.EntityFrameworkCore;
using DataAccess.Paging;
namespace DataAccess.Repository
{
    public class ExchangeDesireRepository : IExchangeDesireRepository
    {
        private FExchangeContext context;
        public ExchangeDesireRepository(FExchangeContext context)
        {
            this.context = context;
        }
        public void create(ExchangeDesire exchangeDesire)
        {
            context.ExchangeDesires.Add(exchangeDesire);
            context.SaveChanges();
        }

        public void delete(int id)
        {
            context.ExchangeDesires.Remove(get(id));
            context.SaveChanges();   
        }

        public ExchangeDesire get(int id)
        {
            return context.ExchangeDesires
                .Include(x=> x.Category)
                .Include(x=> x.Product)
                .FirstOrDefault(d => d.Id == id);
        }

        public PagedList<ExchangeDesire> getAllByCategory(int categoryID, PagingParams p)
        {
            var ExchangeDesires = context.ExchangeDesires
                                        .Where(x => x.CategoryId == categoryID)
                                        .Include(x => x.Category)
                                        .Include(x => x.Product)
                                        .Skip((p.PageNumber - 1) * p.PageSize)
                                        .Take(p.PageSize);
            return new PagedList<ExchangeDesire>(ExchangeDesires,
                1, 100
                );
        }

        public PagedList<ExchangeDesire> getAllByProduct(int productID, PagingParams p)
        {
            var ExchangeDesires = context.ExchangeDesires
                                        .Where(x => x.ProductId == productID)
                                        .Include(x => x.Category)
                                        .Include(x => x.Product)
                                        .Skip(p.PageNumber)
                                        .Take(p.PageSize);
            return new PagedList<ExchangeDesire>
                (
                    ExchangeDesires,
                    1, 100
                );
        }
    }
}
