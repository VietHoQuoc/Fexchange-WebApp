﻿using System;
using System.Collections.Generic;

#nullable disable

namespace BusinessObject.Models
{
    public partial class Account
    {
        public Account()
        {
            Notifications = new HashSet<Notification>();
            Orders = new HashSet<Order>();
            ProductPosts = new HashSet<ProductPost>();
        }

        public int Id { get; set; }
        public string Gmail { get; set; }
        public string Status { get; set; }
        public int? Role { get; set; }
        public string FullName { get; set; }
        public double? Bean { get; set; }

        public virtual Role RoleNavigation { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ProductPost> ProductPosts { get; set; }
    }
}
