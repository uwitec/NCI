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
    
    public partial class DC_REGQUESTIONDATA
    {
        public int ID { get; set; }
        public Nullable<int> ITEMID { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<int> ITEMVALUE { get; set; }
        public Nullable<int> SEQ { get; set; }
    
        public virtual DC_REGEVALQUESTION DC_REGEVALQUESTION { get; set; }
    }
}
