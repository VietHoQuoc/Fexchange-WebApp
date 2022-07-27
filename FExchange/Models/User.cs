﻿namespace FExchange.Models
{
    public class FeedBack
    {
        public int Rate { get; set; }
        public string Feedback { get; set; }
    }
    public class User
    {
        public System.Guid id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string oauthSubject { get; set; }
        public string oauthIssuer { get; set; }
    }

    public class UserView
    {
        public string tokenId { get; set; }
    }
}
