using api.Secure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using IBLL;
using Model;
namespace api.Controllers
{
    [ApiAuthorize]

    public class ResourceController : ApiController
    {
        IResourceService resource = new ResourceService();
         
        /// <summary>
        /// /api/Resource
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Resource> GetResource()
        {
            string sql = "select * from Resource where IsDeleted = 0 ";
            IEnumerable<Resource> temp = resource.SqlQuery(sql);
            return temp;
        }


        /// <summary>
        /// /api/ResourceDelete?id
        /// </summary>
        /// <param name="id"></param>
        public void DeleteResource(string id)
        {
            resource.Delete(new Guid(id));
        }


 

        [HttpGet]
        public IHttpActionResult GetOKResult()
        {
            return Ok();
        }

    }
}
