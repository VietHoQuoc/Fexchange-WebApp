using System;
using System.Collections.Generic;

#nullable disable

namespace BusinessObject.Models
{
    public partial class WishList
    {
        public int ProductPostId { get; set; }
        public int AccountId { get; set; }

        public virtual Account Account { get; set; }
        public virtual ProductPost ProductPost { get; set; }
    }
}
