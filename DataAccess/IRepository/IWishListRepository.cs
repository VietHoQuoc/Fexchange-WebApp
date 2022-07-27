using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using BusinessObject.Models;
using DataAccess.Paging;

namespace DataAccess.IRepository
{
    public interface IWishListRepository
    {
        void Create(WishList wish);
        void Delete(WishList wish);
        List<WishList> GetByAccountId(int id,int pageNumber,int PageSize);
        List<WishList> GetByProductId(int id,int pageNumber, int PageSize);
        WishList GetById(int aid,int pid);
    }
}
