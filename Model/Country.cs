using System;

namespace Model
{
    public class Country
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string TransparencyIndex { get; set; }
        public string BaselAMLIndex { get; set; }
        public string OECD { get; set; }
        public string UN { get; set; }
        public string OFAC { get; set; }
        public string FinalRating { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDt { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDt { get; set; }
    }
}
