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
    
    public partial class LTC_REHABILITREC
    {
        public long ID { get; set; }
        public Nullable<long> FEENO { get; set; }
        public Nullable<int> REGNO { get; set; }
        public Nullable<System.DateTime> RECDATE { get; set; }
        public Nullable<int> INTERVALDAY { get; set; }
        public string RECORDBY { get; set; }
        public string NEXTRECORDBY { get; set; }
        public string HOSPNAME { get; set; }
        public string ITEMNAME { get; set; }
        public string ASSESSMENT { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<System.DateTime> CREATEDATE { get; set; }
        public string CREATEBY { get; set; }
        public Nullable<System.DateTime> NEXTRECDATE { get; set; }
        public string ORGID { get; set; }
    }
}
