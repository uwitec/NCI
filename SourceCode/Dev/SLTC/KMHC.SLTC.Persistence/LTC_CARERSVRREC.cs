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
    
    public partial class LTC_CARERSVRREC
    {
        public long ID { get; set; }
        public Nullable<long> FEENO { get; set; }
        public Nullable<int> REGNO { get; set; }
        public string CARER { get; set; }
        public Nullable<System.DateTime> RECDATE { get; set; }
        public string SVRADDRESS { get; set; }
        public string SVRTYPE { get; set; }
        public string SVRPEOPLE { get; set; }
        public string RELATIONTYPE { get; set; }
        public string QUESTIONLEVEL { get; set; }
        public string QUESTIONFOCUS { get; set; }
        public string PROCESSACTIVITY { get; set; }
        public string SVRFOCUS { get; set; }
        public string QUESTIONDESC { get; set; }
        public string TREATDESC { get; set; }
        public string EVALSTATUS { get; set; }
        public Nullable<int> EVALMINUTES { get; set; }
        public string EVALDESC { get; set; }
        public Nullable<System.DateTime> CREATEDATE { get; set; }
        public string CREATEBY { get; set; }
        public string ORGID { get; set; }
    }
}
