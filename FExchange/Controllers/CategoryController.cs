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

namespace FExchange.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private ICategoryRepository categoryRepository;
        private IMapper mapper;
        public CategoryController(IMapper mapper,ICategoryRepository categoryRepository)
        {
            this.mapper = mapper;
            this.categoryRepository = categoryRepository;
        }
        
        [HttpGet("{id}")]
        public CategoryDTO get(int id)
        {
            Category category = categoryRepository.get(id);
            CategoryDTO dto = mapper.Map<CategoryDTO>(category);
            return dto;
        }
        [HttpDelete("{id}")]
        public void delete(int id)
        {
            
        }
        [HttpGet("{pageNumber}/{pageSize}")]
        public List<CategoryDTO> search(int? NumberOfExchangeDesires, int? NumberOfProductPosts
            ,bool all,int pageNumber,int pageSize)
        {
            Dictionary<int, Category> dic = new Dictionary<int, Category>();
            PagingParams paging = new PagingParams()
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };
            if (all == false)
            {
                if (NumberOfExchangeDesires != null)
                {
                    List<Category> list = categoryRepository
                        .getAll(x => x.ExchangeDesires.Count >= NumberOfExchangeDesires,paging).List;
                    foreach (var item in list)
                    {
                        dic.Add(item.Id, item);
                    }
                }
                if (NumberOfProductPosts != null)
                {
                    List<Category> list = categoryRepository
                        .getAll(x => x.ProductPosts.Count >= NumberOfProductPosts, paging).List;
                    List<Category> categories = new List<Category>();
                    foreach (var item in list)
                    {
                        if (dic.ContainsKey(item.Id))
                        {
                            categories.Add(item);
                        }
                    }
                    dic.Clear();
                    foreach (var item in categories) dic.Add(item.Id, item);
                }
                return dic.Values.Select(x => mapper.Map<CategoryDTO>(x)).ToList();
            }
            else
            {
                return categoryRepository.getAll(null, paging).List.Select(x => mapper.Map<CategoryDTO>(x)).ToList();
            }
            
        }
        [HttpPost("")]
        public void create(CategoryDTO dto)
        {
            Category category = mapper.Map<Category>(dto);
            category.Id = 0;
            categoryRepository.create(category);
        }
        [HttpPut("{id}")]
        public void update([FromRoute]int id,CategoryDTO dto)
        {
            Category category = categoryRepository.get(id);
            category.Category1 = dto.Category1;
            categoryRepository.update(category);
        }
    }
}
