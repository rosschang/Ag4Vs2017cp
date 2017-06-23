using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Dapper;

namespace DbContext
{
    public class Currency
    {
        public Currency() { } // Consideration: Open Connection here, inherit idisposable to close/terminate/destroy connection.

        public IEnumerable<Model.Currency> DbGet()
        {
            using (IDbConnection connection = Helper.OpenConnection())
            {
                const string query = "SELECT [CurrencyId], [CurrencyCode], [CurrencyName], [DayCount], [Multiplier], [IsActive], [IsDeleted], [CreatedBy], [CreatedDt], [ModifiedBy], [ModifiedDt] FROM Currency WHERE IsDeleted = 0 ";
                return connection.Query<Model.Currency>(query);
            }
        }

        public Model.Currency DbGet(int id)
        {
            using (IDbConnection connection = Helper.OpenConnection())
            {
                const string query = "SELECT [CurrencyId], [CurrencyCode], [CurrencyName], [DayCount], [Multiplier], [IsActive], [IsDeleted], [CreatedBy], [CreatedDt], [ModifiedBy], [ModifiedDt] FROM Currency WHERE IsDeleted = 0 AND CurrencyId=@CurrencyId ";
                return connection.Query<Model.Currency>(query, new { CurrencyId = id }).SingleOrDefault();
            }
        }

        public int DbAdd(Model.Currency currency)
        {
            using (IDbConnection connection = Helper.OpenConnection())
            {
                const string query = "INSERT INTO Currency ( [CurrencyCode], [CurrencyName], [DayCount], [Multiplier], [IsActive], [CreatedBy], [CreatedDt], [ModifiedBy], [ModifiedDt]) VALUES ( @CurrencyCode, @CurrencyName, @DayCount, @Multiplier, @IsActive, @CreatedBy, @CreatedDt, @ModifiedBy, @ModifiedDt) ";

                var rowsAffected = connection.Execute(query, currency);
                Helper.SetIdentity<int>(connection, id => currency.CurrencyId = id);
                return rowsAffected;
            }
        }

        public int DbUpdate(Model.Currency currency)
        {
            using (IDbConnection connection = Helper.OpenConnection())
            {
                const string query = "UPDATE Currency SET [CurrencyCode] = @CurrencyCode, [CurrencyName] = @CurrencyName, [DayCount] = @DayCount, [Multiplier] = @Multiplier, [IsActive] = @IsActive, [ModifiedBy] = @ModifiedBy, [ModifiedDt] = @ModifiedDt WHERE CurrencyId = @CurrencyId";

                var rowsAffected = connection.Execute(query, currency);
                //Helper.SetIdentity<int>(connection, id => currency.CurrencyId = id);
                return rowsAffected;
            }
        }

        public int DbDelete(int ccyId, string by, DateTime on)
        {
            using (IDbConnection connection = Helper.OpenConnection())
            {
                const string query = "UPDATE Currency SET IsDeleted = 1, ModifiedBy = @ModifiedBy, ModifiedDt = @ModifiedDt WHERE CurrencyId = @CurrencyId";

                //CommandDefinition cd = new CommandDefinition(query);

                var dbArgs = new DynamicParameters();
                dbArgs.Add("@CurrencyId", ccyId);
                dbArgs.Add("@ModifiedBy", by);
                dbArgs.Add("@ModifiedDt", on);

                var rowsAffected = connection.Execute(query, dbArgs);

                return rowsAffected;
            }
        }
    }
}
