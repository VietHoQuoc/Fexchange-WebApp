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
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace FExchange.Controllers
{
    [Route("api/acounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountRepository AccountRepository;
        private IMapper mapper;
        private IWebHostEnvironment environment;
        private FExchangeContext context;
        public AccountController(IMapper mapper, IAccountRepository accountRepository)
        {
            AccountRepository = accountRepository;
            this.mapper = mapper;
            context = new FExchangeContext();
        }
        [HttpPost("uploadImage")]
        public async  Task<string> upload(IFormFile[] files)
        {
            FileInfo fileInfo;
            string connectionString = "DefaultEndpointsProtocol=https;AccountName=merry;AccountKey=AOHLpp9ABjn/pEwmw6skcyzHGoujukf2KFTAkWFBt8LpSZ19cTohCv/bLXhMrRBJqHqok47dVRRk+ASt1s4qRA==;EndpointSuffix=core.windows.net";
            string containerName = "yume"; 
            var container = new BlobContainerClient(connectionString,containerName);
            foreach (IFormFile file in files)
            {
                try
                {
                    var blobClient = container.GetBlobClient(file.FileName);
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        ms.Position = 0;
                        var blobHttpHeader = new BlobHttpHeaders { ContentType = "image/jpeg" };
                        await blobClient.UploadAsync(ms, new BlobUploadOptions { HttpHeaders = blobHttpHeader });
                        
                    }
                    return "https:\\merry.blob.core.windows.net\\yume\\" + file.FileName;

                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            return "Not OK";
        }
        [HttpPost("")]
        public void create([FromBody] AccountDTO dto)
        {
            Account acc = mapper.Map<Account>(dto);
            AccountRepository.create(acc);
        }
        private void connect(Account account,int id)
        {
            
        }

        [HttpGet("{id}")]
        public AccountDTO get(int id)
        {
            Account account = AccountRepository.findById(id);
            
            AccountDTO acc = mapper.Map<AccountDTO>(account);
            
            return acc;
        }
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        [HttpDelete("{id}")]
        public void delete(int id)
        {
            Account acc = AccountRepository.findById(id);
            acc.Status = "Inactive";
            AccountRepository.update(acc);  
        }
        [HttpGet("{pageSize}/{pageNumber}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public List<AccountDTO> search(int? NumberOfProductPosts,int? NumberOfOrders,string? name, int pageSize,int pageNumber)
        {
            PagingParams pagingParams = new PagingParams()
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
            };
            Dictionary<int, Account> dic = new Dictionary<int, Account>();
            if (name != null)
            {
                List<Account> accounts = AccountRepository
                    .findAll(x => x.FullName.Contains(name) && x.Status == "Active", pagingParams)
                    .List;
                foreach (Account account in accounts) dic.Add(account.Id, account);
            }
            else
            {
                if (NumberOfOrders != null && NumberOfProductPosts != null)
                {
                    List<Account> accounts = AccountRepository
                        .findAll(x => x.Orders.Count >= NumberOfOrders && x.Status == "Active", pagingParams)
                        .List;
                    foreach (Account account in accounts) dic.Add(account.Id, account);


                    List<Account> accounts2 = AccountRepository
                        .findAll(x => x.ProductPosts.Count >= NumberOfProductPosts && x.Status == "Active", pagingParams).List;
                    List<Account> accounts1 = new List<Account>();
                    foreach (var account in accounts2)
                    {
                        if (dic.ContainsKey(account.Id))
                        {
                            accounts1.Add(account);
                        }
                    }
                    dic.Clear();
                    foreach (var account in accounts1) dic.Add(account.Id, account);
                }
                else
                {
                    if (NumberOfProductPosts != null)
                    {
                        List<Account> accounts = AccountRepository
                            .findAll(x => x.ProductPosts.Count >= NumberOfProductPosts && x.Status == "Active", pagingParams).List;
                        foreach (var account in accounts)
                        {
                            dic.Add(account.Id, account);
                        }
                        
                       
                    }else if (NumberOfOrders != null)
                    {
                        List<Account> accounts = AccountRepository
                        .findAll(x => x.Orders.Count >= NumberOfOrders && x.Status == "Active", pagingParams)
                        .List;
                        foreach (Account account in accounts) dic.Add(account.Id, account);

                    }
                }


                
            }
            


            return dic.Values.Select(x => mapper.Map<AccountDTO>(x)).ToList();
        }
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public string update([FromRoute] int id,AccountDTO dto)
        {
           
            Account account = AccountRepository.findById(id);
            Account currentAccount = GetCurrentUser();
            if (currentAccount.Gmail != account.Gmail)
            {
                return "You're not allowed";
            }
            if (dto.FullName != null) account.FullName = dto.FullName;
            if (dto.Gmail != null) account.Gmail = dto.Gmail;
            if (dto.Bean != null) account.Bean = dto.Bean;
            if (dto.Address != null) account.Address = dto.Address;
            if (dto.Phone != null) account.Phone = dto.Phone;
            //if (dto.Avatar != null) account.Avatar = dto.Avatar;    
            AccountRepository.update(account);
            return "OK";
            //context.Accounts.Update(account);
            //context.SaveChanges();
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
    }
}
