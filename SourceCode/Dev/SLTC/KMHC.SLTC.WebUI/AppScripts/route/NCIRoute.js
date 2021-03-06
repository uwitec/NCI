angular.module('sltcApp')
.config([
        '$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {

            cfpLoadingBarProvider.spinnerTemplate = '<div class="loading"><span class="fa fa-spinner fa-spin" style="color: #FFF;"></span> 加载中...</div>';
            cfpLoadingBarProvider.latencyThreshold = 800;
            $urlRouterProvider.when("/", "/NCIA/HlxDesk").otherwise('/');
            //参保人基本信息录入
            $stateProvider.state('applicant', { url: '/NCIA/applicant', templateUrl: '/Views/NCIA/Applicant.html', controller: 'NCIAApplicantCtrl' });
            $stateProvider.state('applicantEdit', { url: '/NCI/applicantEdit/:id', templateUrl: '/Views/NCIA/ApplicantEdit.html', controller: 'NCIAApplicantEditCtrl' });

            //入院申请
            $stateProvider.state('appHosp', { url: '/NCIA/appHosp', templateUrl: '/Views/NCIA/AppHosp.html', controller: 'NCIAAppHospCtrl' });
            $stateProvider.state('appHospEdit', { url: '/NCIA/appHospEdit/:id', templateUrl: '/Views/NCIA/AppHospEdit.html', controller: 'NCIAAppHospEditCtrl' });
            $stateProvider.state('appHospView', { url: '/NCIA/appHospView/:id', templateUrl: '/Views/NCIA/AppHospView.html', controller: 'NCIAAppHospViewCtrl' });

            $stateProvider.state('auditAppHosp', { url: '/NCIA/auditAppHosp', templateUrl: '/Views/NCIA/AuditAppHosp.html', controller: 'NCIAAuditAppHospCtrl' });
            $stateProvider.state('auditAppHospEdit', { url: '/NCIA/auditAppHospEdit/:id', templateUrl: '/Views/NCIA/AuditAppHospEdit.html', controller: 'NCIAAuditAppHospEditCtrl' });
            $stateProvider.state('auditAppHospView', { url: '/NCIA/auditAppHospView/:id', templateUrl: '/Views/NCIA/AuditAppHospView.html', controller: 'NCIAAuditAppHospViewCtrl' });
            //经办机构资格审核
            $stateProvider.state('auditAppcertList', { url: '/NCIA/auditAppcertList', templateUrl: '/Views/NCIA/AuditAppcertList.html', controller: 'AuditAppcertListCtrl' });
            $stateProvider.state('auditAppcertEdit', { url: '/NCIA/auditAppcertEdit/:id', templateUrl: '/Views/NCIA/AuditAppcertEdit.html', controller: 'AuditAppcertEditCtrl' });
            $stateProvider.state('auditAppcertForm', { url: '/NCIA/auditAppcertForm/:id', templateUrl: '/Views/NCIA/AuditAppcertForm.html', controller: 'AuditAppcertEditCtrl' });
            //个案管理
           // $stateProvider.state('caseStudy', { url: '/NCI/CaseStudy', templateUrl: '/Views/EC/CaseStudy.html', controller: 'ltcInsuranceCaseStudy' });
            $stateProvider.state('caseStudyAdd', { url: '/NCI/caseStudyEdit', templateUrl: '/Views/EC/caseStudyEdit.html', controller: 'ltcInsuranceCaseStudyEdit' });
            $stateProvider.state('caseStudyEdit', { url: '/NCI/caseStudyEdit/:id', templateUrl: '/Views/EC/caseStudyEdit.html', controller: 'ltcInsuranceCaseStudyEdit' });

            $stateProvider.state('regEvalSheet', { url: '/NCI/RegEvalSheet?Name&IdNo&birthDate', templateUrl: '/Views/EC/ECRegEvalSheet.html', controller: 'regEvalSheetCtrl' });
            $stateProvider.state('regEvalList', { url: '/NCI/RegEvalList', templateUrl: '/Views/EC/ECRegEvalList.html', controller: 'ltcInsuranceCaseStudy' });
            //居民评估结果
            $stateProvider.state('EvaluationResults', { url: '/NCI/EvaluationResults', templateUrl: '/Views/EC/EvaluationResults.html', controller: 'EvaluationResultsCtrl' });
            $stateProvider.state('EvaluationResultsStatistics', { url: '/NCI/EvaluationResultsStatistics', templateUrl: '/Views/EC/EvaluationResultsStatistics.html', controller: 'EvaluationResultsStatisticsCtrl' });
            $stateProvider.state('EvaluationResultsDetail', { url: '/NCI/EvaluationResultsDetail/:id', templateUrl: '/Views/EC/EvaluationResultsDetail.html', controller: 'EvaluationResultsDetailCtrl' });
            $stateProvider.state('EvaluationResultsHistory', { url: '/NCI/EvaluationResultsHistory/:IDNO', templateUrl: '/Views/EC/EvaluationResultsHistory.html', controller: 'EvaluationResultsHistoryCtrl' });

            // 月度费用管理
            $stateProvider.state('monFeeList', { url: '/NCIP/monFeeList', templateUrl: '/Views/NCIP/MonFeeList.html', controller: 'MonFeeCtrl' });
            $stateProvider.state('monFeeListEdit', { url: '/NCIP/monFeeListEdit/:id', templateUrl: '/Views/NCIP/MonFeeListEdit.html', controller: 'MonFeeEditCtrl' });
            $stateProvider.state('monFeeDetail', { url: '/NCIP/monFeeDetail/:id/:idlist', templateUrl: '/Views/NCIP/monFeeDetail.html', controller: 'MonFeeDetailCtrl' });
            $stateProvider.state('rsMonFeeDtl', { url: '/NCIP/rsMonFeeDtl/:idlist/:id/:rsMonFeeId/:YearMon', templateUrl: '/Views/NCIP/RSMonFeeDtl.html', controller: 'rsMonFeeDtlCtrl' });

            //拨款管理
            $stateProvider.state('payGrantList', { url: '/NCIP/payGrantList', templateUrl: '/Views/NCIP/PayGrantList.html', controller: 'PayGrantCtrl' });
            $stateProvider.state('payGrantEdit', { url: '/NCIP/payGrantEdit/:id', templateUrl: '/Views/NCIP/PayGrantEdit.html', controller: 'PayGrantEditCtrl' });
            $stateProvider.state('payGrantDetail', { url: '/NCIP/payGrantDetail/:id/:payid', templateUrl: '/Views/NCIP/PayGrantDetail.html', controller: 'payGrantDetail' });
            $stateProvider.state('rspayGrantDtl', { url: '/NCIP/rspayGrantDtl/:payid/:id/:rsMonFeeId/:YearMon', templateUrl: '/Views/NCIP/RSpayGrantDtl.html', controller: 'rspayGrantCtrl' });

            //护理险资格申请
            $stateProvider.state('appcertList', { url: '/NCIA/appcertList', templateUrl: '/Views/NCIA/AppcertList.html', controller: 'AppcertListCtrl' });
            $stateProvider.state('appcertEdit', { url: '/NCIA/appcertEdit/:id/:oldId/:ssNo', templateUrl: '/Views/NCIA/AppcertEdit.html', controller: 'AppcertEditCtrl' });
            $stateProvider.state('appcertForm', { url: '/NCIA/appcertForm/:id', templateUrl: '/Views/NCIA/AppcertForm.html', controller: 'AppcertEditCtrl' });
            //统计分析
            $stateProvider.state('OrgStatistics', { url: '/NCIA/OrgStatistics', templateUrl: '/Views/NCIA/OrgStatistics.html', controller: 'OrgStatisticsCtrl' });
            $stateProvider.state('ComStatistics', { url: '/NCIA/ComStatistics', templateUrl: '/Views/NCIA/ComStatistics.html', controller: 'ComStatisticsCtrl' });
            $stateProvider.state('caseManagement', { url: '/NCIA/caseManagement', templateUrl: '/Views/NCIA/caseManagement.html', controller: 'caseManagementCtrl' });

            $stateProvider.state('StyleDemo', { url: '/NCI/StyleDemo', templateUrl: '/Views/NCIA/StyleDemo.html' });
            $stateProvider.state('StyleDemoDetail', { url: '/NCI/StyleDemoDetail', templateUrl: '/Views/NCIA/StyleDemoDetail.html' });

            //用户管理
            $stateProvider.state('UserList', { url: '/NCIA/UserList', templateUrl: '/Views/OrganizationManage/UserList.html', controller: 'userListCtrl' });
            $stateProvider.state('UserAdd', { url: '/NCIA/UserEdit', templateUrl: '/Views/OrganizationManage/UserEdit.html', controller: 'userEditCtrl' });
            $stateProvider.state('UserEdit', { url: '/NCIA/UserEdit/:id', templateUrl: '/Views/OrganizationManage/UserEdit.html', controller: 'userEditCtrl' });
            //角色管理
            $stateProvider.state('RoleList', { url: '/NCIA/RoleList', templateUrl: '/Views/OrganizationManage/RoleList.html', controller: 'roleListCtrl' });
            $stateProvider.state('RoleListNew', { url: '/NCIA/RoleListNew', templateUrl: '/Views/OrganizationManage/RoleListNew.html', controller: 'roleListCtrl' });
            $stateProvider.state('RoleAdd', { url: '/NCIA/RoleEdit', templateUrl: '/Views/OrganizationManage/RoleEdit.html', controller: 'roleEditCtrl' });
            $stateProvider.state('RoleEdit', { url: '/NCIA/RoleEdit/:id', templateUrl: '/Views/OrganizationManage/RoleEdit.html', controller: 'roleEditCtrl' });
            $stateProvider.state('RoleEditNew', { url: '/NCIA/RoleEditNew/:id', templateUrl: '/Views/OrganizationManage/RoleEditNew.html', controller: 'roleEditNewCtrl' });

            //经办机构服务保证金发放
            $stateProvider.state('serviceDepositList', { url: '/NCIP/ServiceDepositList', templateUrl: '/Views/NCIP/ServiceDepositList.html', controller: 'ServiceDepositListCtrl' });
            $stateProvider.state('serviceDepositGrant', { url: '/NCIP/ServiceDepositGrant', templateUrl: '/Views/NCIP/ServiceDepositGrant.html', controller: 'ServiceDepositGrantCtrl' });
            $stateProvider.state('serviceDepositGrantList', { url: '/NCIP/ServiceDepositGrantList', templateUrl: '/Views/NCIP/ServiceDepositGrantList.html', controller: 'ServiceDepositGrantListCtrl' });

            //住民在院状态信息列表
            $stateProvider.state('RegInHosStatusList', { url: '/NCIP/RegInHosStatusList', templateUrl: '/Views/NCIP/RegInHosStatusList.html', controller: 'regInHosStatusListCtrl' });

            //经办机构护理险资格年审
            $stateProvider.state('auditYearCert', { url: '/NCIA/AuditYearCert', templateUrl: '/Views/NCIA/AuditYearCert.html', controller: 'AuditYearCertCtrl' });
            $stateProvider.state('monthFeeStatistics', { url: '/NCIA/MonthFeeStatistics', templateUrl: '/Views/NCIA/MonthFeeStatistics.html', controller: 'monthFeeStatisticsCtrl' });
            $stateProvider.state('exportReport', { url: '/NCIP/ExportReport', templateUrl: '/Views/Report/ExportReport.html', controller: 'exportReportCtrl' });

            //报表管理
            $stateProvider.state('reportTempManage', { url: '/NCIP/reportTempManage', templateUrl: '/Views/Report/ReportTempManage.html', controller: 'reportTempManageCtrl' });

            //人员状态统计报表
            $stateProvider.state('reportPersonStatus', { url: '/NCIP/reportPersonStatus', templateUrl: '/Views/Report/reportPersonStatus.html', controller: 'reportPersonStatus' });

            //护理险首页
            $stateProvider.state('hlxDesk', { url: '/NCIA/HlxDesk', templateUrl: '/Views/Home/HlxDesk.html', controller: 'hlxDeskCtrl' });
            $stateProvider.state('hlxSbaoDesk', { url: '/NCIA/HlxSbaoDesk', templateUrl: '/Views/Home/HlxSbaoDesk.html', controller: 'hlxSbaoDeskCtrl' });

            //巡检扣款记录
            $stateProvider.state('deducTion', { url: '/NCIP/DeducTion', templateUrl: '/Views/NCIP/DeducTion.html', controller: 'deducTionCtrl' });

            $locationProvider.html5Mode(true);
        }
]);