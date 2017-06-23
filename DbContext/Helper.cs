using Dapper;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System;
using System.Linq;

namespace DbContext
{
    class Helper
    {

        public static SqlConnection OpenConnection()
        {
            string cstr = ConfigurationManager.ConnectionStrings["AppConn"].ConnectionString;

            var cn = new SqlConnection(cstr);

            return cn;
        }

        public static void SetIdentity<T>(IDbConnection connection, Action<T> setId)
        {
            dynamic identity = connection.Query("SELECT ISNULL(@@IDENTITY,0) AS Id").Single();
            T newId = (T)identity.Id;
            setId(newId);
        }
    }
}
