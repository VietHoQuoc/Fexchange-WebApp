using FExchange.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;
using DataAccess.IRepository;
using DataAccess.Repository;
using BusinessObject.Models;

namespace FExchange.Services
{
    public interface IAuthService
    {
        Task<Account> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload);
    }

    public class AuthService : IAuthService
    {
        private IAccountRepository accountRepository;
        public AuthService(IAccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;

        }
        public async Task<Account> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            await Task.Delay(1);
            return this.FindUserOrAdd(payload);
        }

        private Account FindUserOrAdd(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {

            var u = accountRepository.checkLogin(payload.Email);
           
            if (u == null)
            {
                u = new Account()
                {
                    Bean = 0,
                    FullName = payload.GivenName +" "+ payload.FamilyName,
                    Gmail = payload.Email,
                    Role = 2,
                    Status = "Active",
                    Avatar = payload.Picture
                };
                accountRepository.create(u);
            }
            u.Avatar = payload.Picture;
            if (u.Status != "Active") return null;
            return u;
        }
    }
}