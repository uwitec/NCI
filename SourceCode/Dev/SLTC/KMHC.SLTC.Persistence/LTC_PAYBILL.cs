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
    
    public partial class LTC_PAYBILL
    {
        public long ID { get; set; }
        public long BILLID { get; set; }
        public string PAYBILLNO { get; set; }
        public Nullable<System.DateTime> PAYBILLTIME { get; set; }
        public string PAYOR { get; set; }
        public Nullable<decimal> COST { get; set; }
        public string INVOICENO { get; set; }
        public string ACCOUNTANTCODE { get; set; }
        public string RECRODBY { get; set; }
        public Nullable<decimal> SUMMARY { get; set; }
        public Nullable<decimal> RECEIVED { get; set; }
        public string BILLSTATUS { get; set; }
    
        public virtual LTC_BILL LTC_BILL { get; set; }
    }
}
