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
    
    public partial class LTC_OWNDRUGDTL
    {
        public int ID { get; set; }
        public int OWNDRUGID { get; set; }
        public int DRUGID { get; set; }
        public string MCDRUGCODE { get; set; }
        public string NSDRUGCODE { get; set; }
        public string CNNAME { get; set; }
        public Nullable<decimal> QTY { get; set; }
        public string UNITS { get; set; }
        public string MANUFACTURER { get; set; }
        public string BATCHNO { get; set; }
        public string COMMENT { get; set; }
        public string CREATEBY { get; set; }
        public Nullable<System.DateTime> CREATETIME { get; set; }
        public string UPDATEBY { get; set; }
        public Nullable<System.DateTime> UPDATETIME { get; set; }
        public Nullable<bool> ISDELETE { get; set; }
    }
}
