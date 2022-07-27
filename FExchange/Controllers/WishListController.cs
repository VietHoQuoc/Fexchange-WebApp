using BusinessObject.Models;
using DataAccess.IRepository;
using DataAccess.Paging;
using FExchange.DTOs;
using FExchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace FExchange.Controllers
{
    [Route("api/wishlist")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        private IWishListService _wishListService;
        private IAccountRepository _accountRepository;
        public WishListController(IWishListService service, IAccountRepository accountRepository)
        {
            _wishListService = service;
            _accountRepository = accountRepository;
        }
        private Account GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return new Account
                {
                    FullName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    Gmail = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                };
            }
            return null;
        }
        private bool CheckAccount(int id)
        {
            Account curaAccount = GetCurrentUser();
            PagingParams pagingParams = new PagingParams()
            {
                PageNumber = 1,
                PageSize = 1,
            };
            Account account = _accountRepository.findAll(x => x.Id == id,pagingParams).List.First();
            if (curaAccount.Gmail != account.Gmail) return false;
            else return true;
        }
        [HttpGet("{accountId}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public List<WishListDTO> Get([FromRoute] int accountId,[FromQuery]int pageNumber)
        {
            if (pageNumber == 0) pageNumber = 1;
            if (CheckAccount(accountId))
            return _wishListService.GetAllWishListByAccount(accountId, pageNumber, 10);
            else { return null; }
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public string Create(WishListDTO dto)
        {

            if (CheckAccount(dto.AccountId))
            {
                bool a = _wishListService.CreateWishList(dto);
                if (a) return "OK";
                else return "Fail To Create";
            }
            else
            {
                return "Not Ok";
            }
        }
        [HttpDelete("{accountId}/{productId}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public string Delete(int accountId,int productId)
        {
            if (CheckAccount(accountId))
            {
                bool a = _wishListService.DeleteWishList(accountId, productId);
                if (a) return "OK";
                else return "Fail To Delete";
            }
            else
            {
                return "Not ok";
            }
        }
    }
}
