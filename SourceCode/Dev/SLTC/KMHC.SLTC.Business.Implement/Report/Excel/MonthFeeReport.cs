﻿#region 文件描述
/******************************************************************
** 创建人   :BobDu
** 创建时间 :
** 说明     :
******************************************************************/
#endregion

using ExcelReport;
using KM.Common;
using KMHC.Infrastructure;
using KMHC.SLTC.Business.Entity;
using KMHC.SLTC.Business.Entity.Base;
using KMHC.SLTC.Business.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using KMHC.SLTC.Business.Entity.Model;
using KMHC.SLTC.Business.Implement.Report.Excel;
using KMHC.SLTC.Business.Entity.Filter;

namespace KMHC.SLTC.Business.Implement.Report.Excel
{
    public class MonthFeeReport : MonthFeeBaseExeclReport
    {
        protected override string FileNamePrefix
        {
            get { return "长期护理险待遇核算表"; }
        }
        protected string GetOrgName(string orgId)
        {
            IOrganizationManageService organizationManageService = IOCContainer.Instance.Resolve<IOrganizationManageService>();
            var org = organizationManageService.GetOrg(orgId);
            return org.Data == null ? "" : org.Data.OrgName;
        }
        protected async override System.Threading.Tasks.Task CreatFormatter()
        {
            Dictionary<string, string> dic = new Dictionary<string, string>() { { "1", "巨鹿县医院" }, { "3", "巨鹿祈康医院" },
            { "2", "巨鹿健民医院" } };
            IReportService service = IOCContainer.Instance.Resolve<IReportService>();
            ILtcService ltcService = IOCContainer.Instance.Resolve<ILtcService>();
            var sDate = StartTime.ToString("yyyy-MM");
            var eDate = EndTime.ToString("yyyy-MM");
            BaseResponse<IList<TreatmentAccount>> res = new BaseResponse<IList<TreatmentAccount>>();
            BaseRequest request = new BaseRequest() { CurrentPage = 1, PageSize = 1000 };
            res = ltcService.GetResMonthData(request, sDate, eDate, NsId) as BaseResponse<IList<TreatmentAccount>>;
            List<PrintMonthFee> list = new List<PrintMonthFee>();
            List<Ipdregout> resIpd = new List<Ipdregout>();
            try
            {
                var result = await HttpClientHelper.NciHttpClient.GetAsync("/api/Ipd?nsno=" + NsId);
                resIpd = result.Content.ReadAsAsync<List<Ipdregout>>().Result;
            }
            catch
            {
                throw new NOContactException();
            }
            try
            {
                list = service.GetPrintData(res,resIpd);
            }
            catch
            {
                throw new NoDataException();
            }
            
            var parameterContainer = new WorkbookParameterContainer();
            parameterContainer.Load(TemplateFormatterPath);
            SheetParameterContainer sheetContainer = parameterContainer["Sheet1"];
            var dataFormatter = new List<ElementFormatter>();
            dataFormatter.Add(new CellFormatter(sheetContainer["Org"], "单位：" + dic[SecurityHelper.CurrentPrincipal.OrgId] + "  " + GetOrgName(SecurityHelper.CurrentPrincipal.OrgId)));
            dataFormatter.Add(new CellFormatter(sheetContainer["Date"], "核算时间："
                + DictHelper.GetFeeIntervalByYearMonth(StartTime.ToString("yyyy-MM")).StartDate + "-" + DictHelper.GetFeeIntervalByYearMonth(EndTime.ToString("yyyy-MM")).EndDate));
            dataFormatter.Add(new CellFormatter(sheetContainer["THospDay"], list.Sum(s => s.HospDay)));
            dataFormatter.Add(new CellFormatter(sheetContainer["TTotalAmount"], list.Sum(s => s.TotalAmount)));
            dataFormatter.Add(new CellFormatter(sheetContainer["TNCIPay"], list.Sum(s => s.NCIPay)));
            var indexNum = 1;
            var tableFormatter = new TableFormatter<PrintMonthFee>(sheetContainer["Index"], list,
               new CellFormatter<PrintMonthFee>(sheetContainer["Index"], t => indexNum++),
               new CellFormatter<PrintMonthFee>(sheetContainer["Name"], t => t.Name),
               new CellFormatter<PrintMonthFee>(sheetContainer["Sex"], t =>t.Sex),
               new CellFormatter<PrintMonthFee>(sheetContainer["ResidentSSId"], t => t.ResidentSSId),
               new CellFormatter<PrintMonthFee>(sheetContainer["BrithPlace"], t => t.BrithPlace),
               new CellFormatter<PrintMonthFee>(sheetContainer["RsStatus"], t => t.RsStatus),
               new CellFormatter<PrintMonthFee>(sheetContainer["DiseaseDiag"], t => t.DiseaseDiag),
               new CellFormatter<PrintMonthFee>(sheetContainer["CareType"], t => t.CareTypeId),
               new CellFormatter<PrintMonthFee>(sheetContainer["CertStartTime"], t => t.EvaluationTime.Value.ToString("yyyy-MM-dd")),
               new CellFormatter<PrintMonthFee>(sheetContainer["InDate"], t => t.InDate.Value.ToString("yyyy-MM-dd")),
               new CellFormatter<PrintMonthFee>(sheetContainer["OutDate"], t => t.OutDate.Value.ToString("yyyy-MM-dd")),
               new CellFormatter<PrintMonthFee>(sheetContainer["HospDay"], t => t.HospDay),
               new CellFormatter<PrintMonthFee>(sheetContainer["TotalAmount"], t => t.TotalAmount),
               new CellFormatter<PrintMonthFee>(sheetContainer["NCIPayLevel"], t => t.NCIPayLevel),
               new CellFormatter<PrintMonthFee>(sheetContainer["NCIPay"], t => t.NCIPay));
            dataFormatter.Add(tableFormatter);
            Formatter = new SheetFormatter("Sheet1", dataFormatter.ToArray());
        }
    }
}
