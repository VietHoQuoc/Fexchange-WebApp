using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObject.Models;
using DataAccess.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccess.Repository
{
    public class ProductImageRepository : IProductImageRepository
    {
        private readonly FExchangeContext context;
        public ProductImageRepository(FExchangeContext context)
        {
            this.context = context;
        }
        public void create(ProductImage productImage)
        {
            context.ProductImages.Add(productImage);
            context.SaveChanges();
        }

        public void delete(int id)
        {
            ProductImage productImage = get(id);
            context.ProductImages.Remove(productImage);
            context.SaveChanges(true);
        }

        public ProductImage get(int id)
        {
            return context.ProductImages.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<ProductImage> GetAll(Expression<Func<ProductImage, bool>> ex)
        {
            return context.ProductImages.Where(ex);
        }

        public void update(ProductImage productImage)
        {
            ProductImage productImage1 = get(productImage.Id);
            productImage1.Image = productImage.Image;
            context.ProductImages.Update(productImage1);
            context.SaveChanges();
        }
    }
}
