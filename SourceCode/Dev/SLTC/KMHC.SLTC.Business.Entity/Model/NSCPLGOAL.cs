﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMHC.SLTC.Business.Entity.Model
{
    public class NSCPLGOAL
    {
        public long ID { get; set; }
        public Nullable<long> FEENO { get; set; }
        public Nullable<int> REGNO { get; set; }
        public Nullable<System.DateTime> RECDATE { get; set; }
        public string CPLGOAL { get; set; }
        public bool? FINISHFLAG { get; set; }
        public Nullable<System.DateTime> FINISHDATE { get; set; }
        public string UNFINISHREASON { get; set; }
        public Nullable<System.DateTime> CREATEDATE { get; set; }
        public string CREATEBY { get; set; }
        public string ORGID { get; set; }
        public Nullable<long> SEQNO { get; set; }
    }
}
