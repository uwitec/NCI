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
    
    public partial class LTC_CHARGEGROUP_CHARGEITEM
    {
        public int CGCIID { get; set; }
        public string CHARGEGROUPID { get; set; }
        public int CHARGEITEMID { get; set; }
        public int CHARGEITEMTYPE { get; set; }
        public int FEEITEMCOUNT { get; set; }
        public string CREATEBY { get; set; }
        public Nullable<System.DateTime> CREATETIME { get; set; }
        public string UPDATEBY { get; set; }
        public Nullable<System.DateTime> UPDATETIME { get; set; }
        public Nullable<bool> ISDELETE { get; set; }
    
        public virtual LTC_CHARGEGROUP LTC_CHARGEGROUP { get; set; }
    }
}
