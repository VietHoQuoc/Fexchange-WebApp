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
using FExchange.Services;
using FExchange.Models;
using Microsoft.AspNetCore.Authorization;
using FExchange.Helpers;
using Google.Apis.Auth;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace FExchange.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IAuthService _authService;
        private IAccountRepository _accountRepository;
        private IConfiguration configuration;
        private IMapper mapper;
        public LoginController(IAuthService authService,IAccountRepository accountRepository,IConfiguration config, IMapper mapper)
        {
            this._authService = authService;
            _accountRepository = accountRepository;
            configuration = config;
            this.mapper = mapper;
        }
        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<UserDTO> Google([FromBody] UserView u)

        {
            try
            {
                //UserView u = new UserView();
                
                //reader.BaseStream.Position = 0;
                //string text = json.GetRawText();
                //string requestBody = await Request.Body.ReadAsStringAsync();
                
                
                SimpleLogger.Log("userView = " + u.tokenId);
                var payload = GoogleJsonWebSignature.ValidateAsync(u.tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
                Account user = await _authService.Authenticate(payload);
                if (user == null)
                {
                    return new UserDTO();
                }
                SimpleLogger.Log(payload.ExpirationTimeSeconds.ToString());
                string role;
                if (user.Role == 1)
                {
                    role = "Admin";
                }
                else role = "User";
                var claims = new[]
                {
                    //new Claim(JwtRegisteredClaimNames.Sub, Security.Encrypt(AppSettings.appSettings.JwtEmailEncryption,user.Gmail)),
                    //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.FullName),
                    new Claim(ClaimTypes.Email, user.Gmail),
                    new Claim(ClaimTypes.Role, role)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AppSettings:JwtSecret"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(String.Empty,
                  String.Empty,
                  claims,
                  expires: DateTime.Now.AddSeconds(55 * 60),
                  signingCredentials: creds);

                AccountDTO dto = mapper.Map<AccountDTO>(user);
                UserDTO userDTO = mapper.Map<UserDTO>(dto);
                string tokenId = new JwtSecurityTokenHandler().WriteToken(token);
                userDTO.tokenId = tokenId;
                return userDTO;
            }
            catch (Exception ex)
            {
                Helpers.SimpleLogger.Log(ex);
                BadRequest(ex.Message);
            }
            return null;
        }

        [HttpPost("createTokenForTest")]
        public string Test()
        {
            var claims = new[]
              {
                    //new Claim(JwtRegisteredClaimNames.Sub, Security.Encrypt(AppSettings.appSettings.JwtEmailEncryption,user.Gmail)),
                    //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, "Dat"),
                    new Claim(ClaimTypes.Email,"tqdatqn01230@gmail.com"),
                    new Claim(ClaimTypes.Role, "User")
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AppSettings:JwtSecret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(String.Empty,
              String.Empty,
              claims,
              expires: DateTime.Now.AddSeconds(55 * 60),
              signingCredentials: creds);
           string tokenId = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenId;
        }

        [HttpGet("checkUserAuthen")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles ="User")]
        public IActionResult checkUser()
        {
            var currentUser= GetCurrentUser();
            return Ok($"Hi {currentUser.FullName}, your email is {currentUser.Gmail}");
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
