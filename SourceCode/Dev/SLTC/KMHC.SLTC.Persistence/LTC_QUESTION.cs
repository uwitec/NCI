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
    
    public partial class LTC_QUESTION
    {
        public int ID { get; set; }
        public int QUESTIONID { get; set; }
        public string QUESTIONNAME { get; set; }
        public Nullable<int> SHOWNUMBER { get; set; }
        public Nullable<bool> ISSHOW { get; set; }
        public string QUESTIONDESC { get; set; }
        public Nullable<int> CATEGORYID { get; set; }
        public string CODE { get; set; }
        public Nullable<bool> SCOREFLAG { get; set; }
        public string ORGID { get; set; }
    }
}
