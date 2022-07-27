using System;

namespace FExchange.DTOs
{
    public class NotificationDTO
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public string Subject { get; set; }
        public string FullName { get; set; }
        public int? OrderId { get; set; }
        public int Product1Id { get; set; }
        //public int? Product2Id { get; set; }
        public int BuyerId { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
