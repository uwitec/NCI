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
    
    public partial class LTC_FAMILYDISCUSSREC
    {
        public long ID { get; set; }
        public Nullable<long> FEENO { get; set; }
        public string INTERVIEWEE { get; set; }
        public string RECORDBY { get; set; }
        public Nullable<System.DateTime> RECORDTIME { get; set; }
        public Nullable<System.DateTime> STARTDATE { get; set; }
        public Nullable<System.DateTime> ENDDATE { get; set; }
        public string VISITTYPE { get; set; }
        public string VISITORNAME { get; set; }
        public string VISITORSEX { get; set; }
        public string VISITORIDNO { get; set; }
        public string VISITORCOMPANY { get; set; }
        public string VISITORTEL { get; set; }
        public Nullable<bool> ISREGVISIT { get; set; }
        public string APPELLATION { get; set; }
        public string BLOODRELATIONSHIP { get; set; }
        public string DESCRIPTION { get; set; }
        public string REMARK { get; set; }
        public string ORGID { get; set; }
    }
}