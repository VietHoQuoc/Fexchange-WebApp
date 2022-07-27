using System;
using System.Collections.Generic;

#nullable disable

namespace BusinessObject.Models
{
    public partial class ProductPost
    {
        public ProductPost()
        {
            ExchangeDesires = new HashSet<ExchangeDesire>();
            OrderProduct2s = new HashSet<Order>();
            OrderProducts = new HashSet<Order>();
            ProductImages = new HashSet<ProductImage>();
            WishLists = new HashSet<WishList>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? Price { get; set; }
        public DateTime? BoughtDate { get; set; }
        public string Img { get; set; }
        public int? GoodsStatus { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int AccountId { get; set; }
        public int CategoryId { get; set; }

        public virtual Account Account { get; set; }
        public virtual Category Category { get; set; }
        public virtual ICollection<ExchangeDesire> ExchangeDesires { get; set; }
        public virtual ICollection<Order> OrderProduct2s { get; set; }
        public virtual ICollection<Order> OrderProducts { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
        public virtual ICollection<WishList> WishLists { get; set; }
    }
}
