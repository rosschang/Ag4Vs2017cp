using System;

namespace Model
{
    public class Currency
    {
        public int CurrencyId { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencyName { get; set; }
        public string DayCount { get; set; }
        public int Multiplier { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDt { get; set; }
        public string CreatedDtStr => CreatedDt == DateTime.MinValue ? "" : CreatedDt.ToString("yyyy/MM/dd");
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDt { get; set; }
        public string ModifiedDtStr => ModifiedDt == DateTime.MinValue ? "" : ModifiedDt.ToString("yyyy/MM/dd");
    }
}
