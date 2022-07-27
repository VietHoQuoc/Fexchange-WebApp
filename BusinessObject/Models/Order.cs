using System;
using System.Collections.Generic;

#nullable disable

namespace BusinessObject.Models
{
    public partial class Order
    {
        public Order()
        {
            Notifications = new HashSet<Notification>();
            Payments = new HashSet<Payment>();
        }

        public int Id { get; set; }
        public int? BuyerId { get; set; }
        public double? Price { get; set; }
        public double? Price2 { get; set; }
        public string Status { get; set; }
        public string Feedback { get; set; }
        public int? Rate { get; set; }
        public int ProductId { get; set; }
        public int? Product2Id { get; set; }
        public string FeedBack2 { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Account Buyer { get; set; }
        public virtual ProductPost Product { get; set; }
        public virtual ProductPost Product2 { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
