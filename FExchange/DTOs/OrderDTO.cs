using System;

namespace FExchange.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int? BuyerId { get; set; }
        public double? Price { get; set; }
        public double? Price2 { get; set; }
        public string Status { get; set; }
        public string Feedback { get; set; }
        public int? Rate { get; set; }
        public int ProductId { get; set; }
        public int? Product2Id { get; set; }

        public string BuyerName { get; set; }
        public string  Product1Name { get; set; }
        public string  Product2Name { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
