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
    
    public partial class LTC_FEERECORD
    {
        public string FEERECORDID { get; set; }
        public string BILLID { get; set; }
        public int CHARGERECORDTYPE { get; set; }
        public int CHARGERECORDID { get; set; }
        public long FEENO { get; set; }
        public decimal UNITPRICE { get; set; }
        public decimal COUNT { get; set; }
        public decimal COST { get; set; }
        public bool ISNCIITEM { get; set; }
        public bool ISREFUNDRECORD { get; set; }
        public string CREATEBY { get; set; }
        public Nullable<System.DateTime> CREATETIME { get; set; }
        public string UPDATEBY { get; set; }
        public Nullable<System.DateTime> UPDATETIME { get; set; }
        public Nullable<bool> ISDELETE { get; set; }
    
        public virtual LTC_BILLV2 LTC_BILLV2 { get; set; }
    }
}
