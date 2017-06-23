using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AgVs2017cp.Controllers
{
    public class CurrencyApiController : BaseApiController
    {
        protected readonly DbContext.Currency dbCcy = new DbContext.Currency();

        // GET: api/CurrencyApi
        [Route("api/currency/")]
        public HttpResponseMessage Get()
        {
            return ToJson(dbCcy.DbGet());
        }

        // GET: api/CurrencyApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CurrencyApi
        [Route("api/currency/")]
        public HttpResponseMessage Post([FromBody]Model.Currency value)
        {
            value.CreatedDt = DateTime.Now;
            value.CreatedBy = "AG2Create";
            value.ModifiedDt = DateTime.Now;
            value.ModifiedBy = "ANGULAR2APP";

            var r = dbCcy.DbAdd(value);
            return ToJson(r);

        }

        // PUT: api/CurrencyApi/5
        [Route("api/currency/{id}")]
        public HttpResponseMessage Put(int id, [FromBody]Model.Currency value)
        {
            // set value such as isDeleted, modifiedby/date on object?
            // -- IsDeleted is persisted?..

            value.ModifiedDt = DateTime.Now;
            value.ModifiedBy = "ANGULAR2APP";

            var r = dbCcy.DbUpdate(value);
            return ToJson(r);
        }


        // DELETE: api/CurrencyApi/5
        [Route("api/currency/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            // note: can have two dbdelete, one hard, one soft delete. 
            // Soft delete to be denoted by POST method with a different URL
            // Hard delete can be denoted by the DELETE method.

            var r = dbCcy.DbDelete(id, "hardcoded By", DateTime.Now);
            return ToJson(r);
        }

    }
}
