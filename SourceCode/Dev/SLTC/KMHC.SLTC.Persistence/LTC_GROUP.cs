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
    
    public partial class LTC_GROUP
    {
        public LTC_GROUP()
        {
            this.LTC_ORG = new HashSet<LTC_ORG>();
        }
    
        public string GROUPID { get; set; }
        public string GROUPNAME { get; set; }
        public string ADDRESS { get; set; }
    
        public virtual ICollection<LTC_ORG> LTC_ORG { get; set; }
    }
}
