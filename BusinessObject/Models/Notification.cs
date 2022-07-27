using System;
using System.Collections.Generic;

#nullable disable

namespace BusinessObject.Models
{
    public partial class Notification
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public string Subject { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? OrderId { get; set; }

        public virtual Account Account { get; set; }
        public virtual Order Order { get; set; }
    }
}
