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
    
    public partial class LTC_NSCPLACTIVITY
    {
        public long ID { get; set; }
        public string CPLACTIVITY { get; set; }
        public Nullable<bool> FINISHFLAG { get; set; }
        public string UNFINISHREASON { get; set; }
        public string CREATEBY { get; set; }
        public string ORGID { get; set; }
        public Nullable<long> SEQNO { get; set; }
        public Nullable<long> FEENO { get; set; }
        public Nullable<int> REGNO { get; set; }
        public Nullable<System.DateTime> RECDATE { get; set; }
        public Nullable<System.DateTime> FINISHDATE { get; set; }
        public Nullable<System.DateTime> CREATEDATE { get; set; }
    
        public virtual LTC_NSCPL LTC_NSCPL { get; set; }
    }
}
