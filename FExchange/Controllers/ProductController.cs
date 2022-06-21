﻿using Microsoft.AspNetCore.Http;
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
    [Route("api/productposts")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductPostRepository _postRepository;
        private IMapper _mapper;
        public ProductController(IProductPostRepository productPost,IMapper mapper)
        {
            _postRepository = productPost;
            _mapper = mapper;
        }
        [HttpGet("{id}")]
        public async Task<ProductPostDTO> Get(int id)
        {
            return _mapper.Map<ProductPostDTO>(_postRepository.get(id));
        }
        [HttpGet("{pageNumber}/{pageSize}")]
        public IEnumerable<ProductPostDTO> search(int? categoryId, int? accountId, bool all, int pageNumber,int pageSize)
        {
            if (all)
            {
                var list=  _postRepository.findAll(pageNumber,pageSize).List;
                foreach (var item in list)
                {
                    Account acc = item.Account;
                }
                return list.Select(
                    x => _mapper.Map<ProductPostDTO>(x));
            }
            else
            {
                if (accountId != null)
                {
                    return _postRepository.findByAccountID((int)accountId,pageNumber,pageSize).List.Select(
                    x => _mapper.Map<ProductPostDTO>(x));
                }
                if (categoryId != null)
                {
                    return
                        _postRepository.findByCategoryID((int)categoryId, pageNumber, pageSize).List.Select(
                    x => _mapper.Map<ProductPostDTO>(x));
                }
                return null;
                
            }

        }
        [HttpDelete("{id}")]
        public void delete(int id)
        {
            _postRepository.delete(id);
        }
        [HttpPut]
        public async Task update([FromQuery] ProductPostDTO dto, IFormFile file)
        {
            ProductPost product = _postRepository.get(dto.Id);
            product.Description = dto.Description;
            product.BoughDate = dto.BoughDate;
            product.Name = dto.Name;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;
            await deleteFile(product.Img);
            await uploadFile(file);
            product.Img = "https:\\merry.blob.core.windows.net\\yume\\" + file.FileName;
            _postRepository.update(product);
        }
        [HttpPost]
        public async Task create([FromQuery]ProductPostDTO dto,IFormFile file)
        {

            ProductPost productPost = _mapper.Map<ProductPost>(dto);
            await uploadFile(file);
            productPost.Img = "https:/merry.blob.core.windows.net/yume/" + file.FileName;
            _postRepository.create(productPost);
        }
        private BlobContainerClient GetBlobContainerClient()
        {
            string connectionString = "DefaultEndpointsProtocol=https;AccountName=merry;AccountKey=AOHLpp9ABjn/pEwmw6skcyzHGoujukf2KFTAkWFBt8LpSZ19cTohCv/bLXhMrRBJqHqok47dVRRk+ASt1s4qRA==;EndpointSuffix=core.windows.net";
            string containerName = "yume";
            return new BlobContainerClient(connectionString, containerName);
        }
        private async Task deleteFile(string filename)
        {
            filename = filename.Substring(filename.LastIndexOf("/") + 1);
            var container = GetBlobContainerClient();
            try
            {
                var blobClient = container.GetBlobClient(filename);
                await blobClient.DeleteIfExistsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        private async Task<String> uploadFile(IFormFile file)
        {
            var container = GetBlobContainerClient();
            try
            {
                var blobClient = container.GetBlobClient(file.FileName);
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    ms.Position = 0;
                    var blobHttpHeader = new BlobHttpHeaders { ContentType = "image/jpeg" };
                    await blobClient.UploadAsync(ms, new BlobUploadOptions { HttpHeaders = blobHttpHeader });
                    ;
                }
                return  "https:/merry.blob.core.windows.net/yume/" + file.FileName;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
