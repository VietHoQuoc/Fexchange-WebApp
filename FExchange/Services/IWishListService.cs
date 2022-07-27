using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessObject.Models;
using FExchange.DTOs;
using AutoMapper;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;
using System.IO;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Hosting;
using System;
using Azure.Storage.Blobs.Models;
using DataAccess.IRepository;
using DataAccess.Repository;
using Microsoft.EntityFrameworkCore;
using DataAccess.Paging;

namespace FExchange.Services
{
    public interface IWishListService
    {
        bool CreateWishList(WishListDTO ws);
        bool DeleteWishList(int accountId, int productId);
        List<WishListDTO> GetAllWishListByAccount(int accoundId,int pageNumber,int pageSize);
        List<WishListDTO> GetAllWishListByProduct(int productId, int pageNumber, int pageSize);

    }
    public class WishListService : IWishListService
    {
        private IWishListRepository _wishListRepository;
        private IMapper _mapper;
        public WishListService(IWishListRepository wishListRepository,IMapper mapper)
        {
            _wishListRepository = wishListRepository;
            _mapper = mapper;
        }
        public bool CreateWishList(WishListDTO ws)
        {
            try
            {
                WishList wishList = _mapper.Map<WishList>(ws);
                _wishListRepository.Create(wishList);
            }catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public bool DeleteWishList(int accountId, int productId)
        {
            try
            {
                WishList wishList = _wishListRepository.GetById(accountId, productId);
                _wishListRepository.Delete(wishList);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public List<WishListDTO> GetAllWishListByAccount(int accoundId, int pageNumber, int pageSize)
        {
            return _wishListRepository.GetByAccountId(accoundId, pageNumber, pageSize)
                    .Select(x => _mapper.Map<WishListDTO>(x)).ToList();
        }

        public List<WishListDTO> GetAllWishListByProduct(int productId, int pageNumber, int pageSize)
        {
            return _wishListRepository.GetByProductId(productId, pageNumber, pageSize)
                    .Select(x => _mapper.Map<WishListDTO>(x)).ToList();
        }
    }
}
