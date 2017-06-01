using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AgVs2017cp.DBContext;
using Newtonsoft.Json;
using System.Text;

namespace AgVs2017cp.Controllers
{
    public class BaseApiController : ApiController
    {
        /*
         * GET method to read all users.
            POST method to create new user.
            PUT method to update the existing user.
            DELETE method to delete existing user.
         */

        protected readonly appDbEntities UserDB = new appDbEntities();
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }

    }
}
