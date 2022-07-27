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
    [Route("api/notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private INotificationRepository notificationRepository;
        private IMapper mapper;
        public NotificationController(IMapper mapper,INotificationRepository notificationRepository)
        {
            this.notificationRepository = notificationRepository;
            this.mapper = mapper;
        }
        [HttpGet("{id}")]
        public NotificationDTO get(int id)
        {
            Notification noti = notificationRepository.get(id);
            return mapper.Map<NotificationDTO>(noti);
        }
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        [HttpDelete("{id}")]
        public void delete(int id)
        {
            Notification notification = notificationRepository.get(id);
            notificationRepository.delete(notification);
        }
        [HttpPost("")]
        public void create(NotificationDTO dto)
        {
            Notification notification = mapper.Map<Notification>(dto);
            notification.Id = 0;
            notification.CreatedDate = DateTime.Now;
            notificationRepository.create(notification);
        }
        [HttpGet("{pageSize}/{pageNumber}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public List<NotificationDTO> search(int accountID,int pageSize,int pageNumber)
        {
            PagingParams p = new PagingParams()
            {
                PageSize = pageSize,
                PageNumber = pageNumber
            };
            List<Notification> list = notificationRepository.getNotifications(accountID, p).List;
            return list.Select(x => mapper.Map<NotificationDTO>(x)).ToList();
        }
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "User")]
        public void update([FromRoute] int id,NotificationDTO dto)
        {
            Notification noti = notificationRepository.get(id);
            noti.Subject = dto.Subject;
            noti.CreatedDate = DateTime.Now;
            notificationRepository.update(noti);
        }
    }
}
