using AutoMapper;
using BusinessObject.Models;
using FExchange.DTOs;
using System.Linq;

namespace FExchange.Mapper
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {

            //Create Wish List

            CreateMap<WishList, WishListDTO>()
                .ForMember(src => src.ProductName, act => act.MapFrom(des => des.ProductPost.Name))
                .ForMember(src => src.AccountName, act => act.MapFrom(des => des.Account.FullName))
                .ForMember(src => src.Status, act => act.MapFrom(des => des.ProductPost.Status))
                .ForMember(src => src.CategoryName, act => act.MapFrom(des => des.ProductPost.Category.Category1))
                .ForMember(src => src.Img, act =>
                act.MapFrom(des => des.ProductPost.ProductImages.FirstOrDefault().Image))
                .ForMember(src => src.Price, act => act.MapFrom(des => des.ProductPost.Price));
            CreateMap<WishListDTO, WishList>();
            //
            CreateMap<AccountDTO, UserDTO>();


            //Account
            CreateMap<Account, AccountDTO>()
                .ForMember(des => des.Role1, act => act.MapFrom(src => src.RoleNavigation.Role1))
                .ForMember(des => des.NumberOfProductPosts, act => act.MapFrom(src => src.ProductPosts.Count))
                .ForMember(des => des.NumberOfOrders, act => act.MapFrom(src => src.Orders.Count))
                .ForMember(des => des.NumberOfNotifications, act => act.MapFrom(src => src.Notifications.Count));
            CreateMap<AccountDTO, Account>();
            //Category
            CreateMap<Category, CategoryDTO>()
                .ForMember(des => des.NumberOfProductPosts, act => act.MapFrom(src => src.ProductPosts.Count))
                .ForMember(des => des.NumberOfExchangeDesires, act => act.MapFrom(src => src.ExchangeDesires.Count));
            CreateMap<CategoryDTO, Category>();
            //ExchangeDesires
            CreateMap<ExchangeDesire, ExchangeDesireDTO>()
                .ForMember(des => des.ProductName, act => act.MapFrom(src => src.Product.Name));
            CreateMap<ExchangeDesireDTO, ExchangeDesire>();
            //Notification
            CreateMap<Notification, NotificationDTO>()
                .ForMember(src => src.FullName, act => act.MapFrom(des => des.Account.FullName))
                .ForMember(src => src.BuyerId, act => act.MapFrom(des => des.Order.BuyerId))
                .ForMember(src => src.Product1Id, act => act.MapFrom(des => des.Order.ProductId));
            CreateMap<NotificationDTO, Notification>();
            //Order
            CreateMap<Order, OrderDTO>()
                .ForMember(src => src.BuyerName, act => act.MapFrom(des => des.Buyer.FullName))
                .ForMember(src => src.Product1Name, act => act.MapFrom(des => des.Product.Name))
                .ForMember(src => src.Product2Name, act => act.MapFrom(des => des.Product2.Name));
            CreateMap<OrderDTO,Order>();
            //ProductPost
            CreateMap<ProductPost, ProductPostDTO>()
                .ForMember(des => des.AccountName, act => act.MapFrom(src => src.Account.FullName))
                .ForMember(des => des.NumberOfExchangeDesires, act => act.MapFrom(src => src.ExchangeDesires.Count))
                .ForMember(des => des.CategoryName, act => act.MapFrom(src => src.Category.Category1))
                .ForMember(des => des.images, act => act.MapFrom(src => src.ProductImages));
            CreateMap<ProductPostDTO, ProductPost>();
            //Payment
            CreateMap<Payment, PaymentDTO>();
            CreateMap<PaymentDTO, Payment>();

            //ProductImage
            CreateMap<ProductImage, ProductImageDTO>();
            CreateMap<ProductImageDTO, ProductImage>();

        }
    }
}
