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
    
    public partial class NCIA_NURSINGHOMEASSTRECORDDETAIL
    {
        public int NSASSTRECORDDETAILID { get; set; }
        public Nullable<int> NSASSTRECORDID { get; set; }
        public int QUESTIONID { get; set; }
        public Nullable<decimal> MAKERVALUE { get; set; }
        public int MAKERID { get; set; }
        public Nullable<int> LIMITEDVALUEID { get; set; }
    
        public virtual NCIA_NURSINGHOMEASSTRECORD NCIA_NURSINGHOMEASSTRECORD { get; set; }
    }
}
