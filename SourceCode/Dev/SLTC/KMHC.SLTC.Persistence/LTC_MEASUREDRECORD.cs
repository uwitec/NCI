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
    
    public partial class LTC_MEASUREDRECORD
    {
        public long ID { get; set; }
        public Nullable<long> FEENO { get; set; }
        public Nullable<System.DateTime> MEASURETIME { get; set; }
        public string MEASUREITEMCODE { get; set; }
        public Nullable<float> MEASUREDVALUE { get; set; }
        public string DESCRIPTION { get; set; }
        public string MEASUREDPERSON { get; set; }
        public string SOURCE { get; set; }
        public string CREATEBY { get; set; }
        public Nullable<System.DateTime> CREATETIME { get; set; }
        public string UPDATEBY { get; set; }
        public Nullable<System.DateTime> UPDATETIME { get; set; }
        public string ORGID { get; set; }
        public Nullable<bool> ISDELETE { get; set; }
    
        public virtual LTC_MEASUREITEM LTC_MEASUREITEM { get; set; }
    }
}
