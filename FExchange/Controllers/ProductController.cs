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

namespace FExchange.Controllers
{
    [Route("api/productposts")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductImageRepository _productImageRepository;
        private IProductPostRepository _postRepository;
        private IMapper _mapper;
        public ProductController(IProductPostRepository productPost,IMapper mapper,IProductImageRepository productImageRepository)
        {
            _postRepository = productPost;
            _mapper = mapper;
            _productImageRepository = productImageRepository;
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
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public void delete(int id)
        {
            _postRepository.delete(id);
        }
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public async Task update(int id,[FromForm] ProductPostDTO dto, [FromForm]IFormFile[] files)
        {
            ProductPost product = _postRepository.get(id);
            if (dto.Description != null) product.Description = dto.Description;
            if (dto.BoughtDate != null) product.BoughtDate = dto.BoughtDate;
            if (dto.Name !=null) product.Name = dto.Name;
            if (dto.Price != null) product.Price = dto.Price;
            if (dto.CategoryId != null) product.CategoryId =(int) dto.CategoryId;
            if (dto.Status != null) product.Status = dto.Status;
            if (dto.GoodsStatus != null) product.GoodsStatus = dto.GoodsStatus;
            if (files != null && files.Count()>0)
            {
                IEnumerable<ProductImage> productImages = _productImageRepository.GetAll(x => x.ProductId == id).ToList();
                foreach (ProductImage image in productImages)
                {
                    await deleteFile(image.Image);
                    _productImageRepository.delete(image.Id);
                }
                foreach (IFormFile file in files)
                {
                    await uploadFile(file);
                    ProductImage productImage = new ProductImage()
                    {
                        Image = "https:/merry.blob.core.windows.net/yume/" + file.FileName,
                        ProductId = id
                    };
                    _productImageRepository.create(productImage);
                }
            }
            _postRepository.update(product);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public async Task create([FromForm]ProductPostDTO dto, [FromForm] IFormFile[] files)
        {
            ProductPost productPost = _mapper.Map<ProductPost>(dto);
            //int id = productPost.Id;
            productPost.Id = 0;
            productPost.GoodsStatus = 1;
            _postRepository.create(productPost);
            int productID = _postRepository.getMax();
            foreach (IFormFile file in files)
            {
                await uploadFile(file);
                ProductImage image = new ProductImage()
                {
                    Image = "https:/merry.blob.core.windows.net/yume/" + file.FileName,
                    ProductId = productID

                };
                _productImageRepository.create(image);
            }
            
        }
        private BlobContainerClient GetBlobContainerClient()
        {
            string connectionString = "DefaultEndpointsProtocol=https;AccountName=merry;AccountKey=AOHLpp9ABjn/pEwmw6skcyzHGoujukf2KFTAkWFBt8LpSZ19cTohCv/bLXhMrRBJqHqok47dVRRk+ASt1s4qRA==;EndpointSuffix=core.windows.net";
            string containerName = "yume";
            return new BlobContainerClient(connectionString, containerName);
        }
        private async Task deleteFile(string filename)
        {
            if (filename == null || filename.Length < 2) return;
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
