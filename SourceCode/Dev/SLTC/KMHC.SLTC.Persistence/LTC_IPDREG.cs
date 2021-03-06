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
    
    public partial class LTC_IPDREG
    {
        public LTC_IPDREG()
        {
            this.LTC_LEAVEHOSP = new HashSet<LTC_LEAVEHOSP>();
        }
    
        public long FEENO { get; set; }
        public string SERVICETYPE { get; set; }
        public string RSTYPE { get; set; }
        public string RSSTATUS { get; set; }
        public string NURLEVEL { get; set; }
        public string RSATT { get; set; }
        public string FMYRSATT { get; set; }
        public string NURASSSUGG { get; set; }
        public string ORGSUGG { get; set; }
        public string IMPCOMMENT { get; set; }
        public string PTYPE { get; set; }
        public Nullable<System.DateTime> INDATE { get; set; }
        public string DEPTNO { get; set; }
        public string NURSENO { get; set; }
        public string CARER { get; set; }
        public string BEDNO { get; set; }
        public string ROOMNO { get; set; }
        public string BEDCLASS { get; set; }
        public string BEDTYPE { get; set; }
        public string FLOOR { get; set; }
        public string BEDKIND { get; set; }
        public Nullable<bool> SICKFLAG { get; set; }
        public Nullable<bool> ROOMFLAG { get; set; }
        public Nullable<bool> PROTFLAF { get; set; }
        public string IPDFLAG { get; set; }
        public Nullable<System.DateTime> OUTDATE { get; set; }
        public Nullable<bool> DANGERFLAG { get; set; }
        public Nullable<decimal> DEPOSITAMT { get; set; }
        public Nullable<decimal> PREPAYAMT { get; set; }
        public Nullable<bool> CTRLFLAG { get; set; }
        public string CTRLREASON { get; set; }
        public string NURSINGTIPS { get; set; }
        public string CARERTIPS { get; set; }
        public string STATEFLAG { get; set; }
        public string STATEREASON { get; set; }
        public string ORGID { get; set; }
        public Nullable<int> REGNO { get; set; }
        public string NUTRITIONIST { get; set; }
        public string PHYSIOTHERAPIST { get; set; }
        public string DOCTOR { get; set; }
        public Nullable<bool> ISFINANCIALCLOSE { get; set; }
        public Nullable<System.DateTime> FINANCIALCLOSETIME { get; set; }
    
        public virtual LTC_REGFILE LTC_REGFILE { get; set; }
        public virtual LTC_IPDREGOUT LTC_IPDREGOUT { get; set; }
        public virtual ICollection<LTC_LEAVEHOSP> LTC_LEAVEHOSP { get; set; }
    }
}
