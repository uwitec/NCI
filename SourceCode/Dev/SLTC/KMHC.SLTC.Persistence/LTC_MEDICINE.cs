//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace KMHC.SLTC.Persistence
{
    using System;
    using System.Collections.Generic;
    
    public partial class LTC_MEDICINE
    {
        public LTC_MEDICINE()
        {
            this.LTC_VISITPRESCRIPTION = new HashSet<LTC_VISITPRESCRIPTION>();
        }
    
        public int MEDID { get; set; }
        public string MEDCODE { get; set; }
        public string CHNNAME { get; set; }
        public string ENGNAME { get; set; }
        public string SIDEEFFECT { get; set; }
        public string MEDKIND { get; set; }
        public string MEDICOLOR { get; set; }
        public string MEDIFACADE { get; set; }
        public string SPECDESC { get; set; }
        public string USEDESC { get; set; }
        public string COMMCODE { get; set; }
        public string MEDTYPE { get; set; }
        public string MEDPICT { get; set; }
        public string INSNO { get; set; }
        public string HOSPNO { get; set; }
        public string ORGID { get; set; }
    
        public virtual ICollection<LTC_VISITPRESCRIPTION> LTC_VISITPRESCRIPTION { get; set; }
    }
}
