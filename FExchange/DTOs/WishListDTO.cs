namespace FExchange.DTOs
{
    public class WishListDTO
    {
        public int ProductPostId { get; set; }
        public int AccountId { get; set; }
        public string ProductName { get; set; }
        public string AccountName { get; set; }
        public string Status { get; set; }

        public int? Price { get; set; }
        public string CategoryName { get; set; }
        public string Img { get; set; } 
    }
}
