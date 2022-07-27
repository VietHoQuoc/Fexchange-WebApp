using Microsoft.AspNetCore.Http;
using System;
using System.Collections;
using System.Collections.Generic;

namespace FExchange.DTOs
{
    public class ProductPostDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int? Price { get; set; }
        public DateTime? BoughtDate { get; set; }
        ///public string Img { get; set; }
        public int? GoodsStatus { get; set; }
        public string Description { get; set; }
        public int? AccountId { get; set; }
        public int? CategoryId { get; set; }
        public string Status { get; set; }
        public string AccountName { get; set; }
        public string CategoryName { get; set; }
        public int? NumberOfExchangeDesires { get; set; }
        public IEnumerable<ProductImageDTO> images { get; set; }
    }
}
