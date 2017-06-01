using System.Linq;
using System.Data.Entity;
using System.Net.Http;
using System.Web.Http;
using AgVs2017cp.DBContext;


namespace AgVs2017cp.Controllers
{
    public class UserApiController : BaseApiController
    {
        [Route("api/user/")]
        public HttpResponseMessage Get()
        {
            //return ToJson(UserDB.TblUsers.AsEnumerable());
            return ToJson(UserDB.TblUsers.SqlQuery("Select * from TblUser").AsEnumerable());
        }

        [Route("api/user/add/")]
        public HttpResponseMessage Post([FromBody]TblUser value)
        {
            UserDB.TblUsers.Add(value);
            return ToJson(UserDB.SaveChanges());
        }

        [Route("api/user/edit/{id}")]
        public HttpResponseMessage Put(int id, [FromBody]TblUser value)
        {
            UserDB.Entry(value).State = EntityState.Modified;
            return ToJson(UserDB.SaveChanges());
        }

        [Route("api/user/delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            UserDB.TblUsers.Remove(UserDB.TblUsers.FirstOrDefault(x => x.Id == id));
            return ToJson(UserDB.SaveChanges());
        }
    }
}
