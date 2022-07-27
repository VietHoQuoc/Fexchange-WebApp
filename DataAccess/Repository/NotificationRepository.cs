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
    public class NotificationRepository : INotificationRepository
    {
        private FExchangeContext context;
        public NotificationRepository(FExchangeContext context)
        {
            this.context = context;
        }
        public void create(Notification notification)
        {
            context.Notifications.Add(notification);
            context.SaveChanges();
        }

        public void delete(Notification notification)
        {
            context.Notifications.Remove(notification);
            context.SaveChanges();
        }

        public Notification get(int id)
        {
            return context.Notifications
                .Include(x=> x.Account)
                .Include(x=> x.Order)
                .FirstOrDefault(x=>x.Id == id);
        }

        public PagedList<Notification> getNotifications(int accountID,PagingParams p)
        {
            return new PagedList<Notification>
                (
                context.Notifications
                .Include(x => x.Account)
                .Include(x => x.Order)
                .Where(x => x.AccountId == accountID),
                p.PageNumber, p.PageSize
                );
        }

        public void update(Notification notification)
        {
            context.Notifications.Attach(notification);
            context.SaveChanges();
        }
    }
}
