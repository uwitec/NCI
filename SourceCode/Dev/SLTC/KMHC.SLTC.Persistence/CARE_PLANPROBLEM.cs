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
    
    public partial class CARE_PLANPROBLEM
    {
        public CARE_PLANPROBLEM()
        {
            this.CARE_PLANACTIVITY = new HashSet<CARE_PLANACTIVITY>();
            this.CARE_PLANCHECKPOINT = new HashSet<CARE_PLANCHECKPOINT>();
            this.CARE_PLANDATA = new HashSet<CARE_PLANDATA>();
            this.CARE_PLANEVAL = new HashSet<CARE_PLANEVAL>();
            this.CARE_PLANFOCUS = new HashSet<CARE_PLANFOCUS>();
            this.CARE_PLANGOAL = new HashSet<CARE_PLANGOAL>();
            this.CARE_PLANREASON = new HashSet<CARE_PLANREASON>();
            this.CARE_PLANTRAIN = new HashSet<CARE_PLANTRAIN>();
        }
    
        public int CP_NO { get; set; }
        public string LEVELPR { get; set; }
        public string CATEGORY { get; set; }
        public string DIAPR { get; set; }
    
        public virtual ICollection<CARE_PLANACTIVITY> CARE_PLANACTIVITY { get; set; }
        public virtual ICollection<CARE_PLANCHECKPOINT> CARE_PLANCHECKPOINT { get; set; }
        public virtual ICollection<CARE_PLANDATA> CARE_PLANDATA { get; set; }
        public virtual ICollection<CARE_PLANEVAL> CARE_PLANEVAL { get; set; }
        public virtual ICollection<CARE_PLANFOCUS> CARE_PLANFOCUS { get; set; }
        public virtual ICollection<CARE_PLANGOAL> CARE_PLANGOAL { get; set; }
        public virtual ICollection<CARE_PLANREASON> CARE_PLANREASON { get; set; }
        public virtual ICollection<CARE_PLANTRAIN> CARE_PLANTRAIN { get; set; }
    }
}