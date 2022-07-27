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
    public class AccountRepository : IAccountRepository
    {
        private FExchangeContext context;
        public AccountRepository(FExchangeContext context)
        {
            this.context = context;
        }
        public Account checkLogin(string gmail)
        {
            return context.Accounts
                .Include(x => x.Notifications)
                .Include(x => x.ProductPosts)
                .Include(x => x.Orders)
                .Include(x => x.RoleNavigation)
                .FirstOrDefault(x => x.Gmail == gmail);
        }

        public void create(Account account)
        {
            context.Accounts.Add(account);
            context.SaveChanges();
        }

        public PagedList<Account> findAll(Expression<Func<Account, bool>> expression,PagingParams pagingParams)
        {
            IEnumerable<Account> accounts = context.Accounts
                .Include(x => x.Notifications)
                .Include(x => x.ProductPosts)
                .Include(x => x.Orders)
                .Include(x => x.RoleNavigation)
                .Where(expression)
                .Skip(pagingParams.PageSize * (pagingParams.PageNumber - 1))
                 .Take(pagingParams.PageSize);
            return new PagedList<Account>(accounts.AsQueryable(),1,100);
        }

        public Account findById(int id)
        {
            return context.Accounts
                .Include(x => x.Notifications)
                .Include(x => x.ProductPosts)
                .Include(x => x.Orders)
                .Include(x => x.RoleNavigation)
                .FirstOrDefault(x => x.Id == id);
        } 
        public void update(Account account)
        {
            context.Update(account);
            context.SaveChanges();
        }
    }
}
