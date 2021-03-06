/*
创建人:张凯
创建日期:2016-03-10
说明: 请假
*/
angular.module("sltcApp")
.controller("leaveHospCtrl", ['$scope', '$filter', 'utility', 'leaveHospRes', 'relationDtlRes', function ($scope, $filter, utility, leaveHospRes, relationDtlRes) {
    $scope.lastLeaveStartDate = "";
    $scope.lastLeaveReturnDate = "";
    $scope.Data = {};
    $scope.LastData = {};
    $scope.currentPage = 1;
    $scope.currentItem = {};
    // 当前住民
    $scope.currentResident = {}
    $scope.buttonShow = false;

    //选中住民
    $scope.residentSelected = function (resident) {
        $scope.currentResident = resident;//获取当前住民信息
        $scope.getlastLeaveHospInfo("residentSelected");
        //获取最新一笔请假记录
        $scope.listItem($scope.currentResident.FeeNo, $scope.currentResident.OrgId);//加载当前住民的请假记录
        $scope.currentItem = {}//清空编辑项
        if (angular.isDefined($scope.currentResident.FeeNo)) {
            $scope.buttonShow = true;
        }
        relationDtlRes.get({ FeeNo: $scope.currentResident.FeeNo, currentPage: 1, pageSize: 100 }, function (data) {
            $scope.Data.ContactList = data.Data;
        });
    }

    //上次离院记录信息
    $scope.getlastLeaveHospInfo = function (workState) {
        $scope.lastLeaveStartDate = "";
        $scope.lastLeaveReturnDate = "";
        var num = 0;
        if (workState == "residentSelected") {
            num = 0;
        }
        else if (workState == "rowSelect") {
            num = 1;
        }

        leaveHospRes.get({ FeeNo: $scope.currentResident.FeeNo, OrgId: $scope.currentResident.OrgId }, function (data) {
            if (data.Data[num] != null) {
                if (data.Data[num].StartDate != null) {
                    $scope.lastLeaveStartDate = data.Data[num].StartDate.replace("T", " ");
                }

                if (data.Data[num].ReturnDate != null) {
                    $scope.lastLeaveReturnDate = data.Data[num].ReturnDate.replace("T", " ");
                }
            }
        });
    };

    $scope.change = function () {
        var o = $("#selContName").find("option:selected");
        if (o.length > 0) {
            $scope.currentItem.ContTel = o.attr("contTel");
            $scope.currentItem.ContRel = o.attr("contrel");
        }
    }

    //获取请假记录
    //$scope.listItem = function (FeeNo, OrgId) {
    //    $scope.Data.leaveHosps = {};
    //    leaveHospRes.query({ currentPage: 1, pageSize: 10, FeeNo: FeeNo, OrgId: OrgId }, function (data) {
    //        $scope.Data.leaveHosps = data;
    //    });
    //}
    $scope.listItem = function (FeeNo, OrgId) {
        /*$scope.Data.items = {};
        $scope.options.params.feeNo = FeeNo;
        $scope.options.search();*/
        $scope.buttonShow = true;
        $scope.Data.leaveHosps = {};
        leaveHospRes.get({ feeNo: FeeNo, currentPage: $scope.currentPage, pageSize: 5, OrgId: OrgId }, function (data) {

            $scope.Data.leaveHosps = data.Data;
            var pager = new Pager('pager', $scope.currentPage, data.PagesCount, function (curPage) {

                $scope.currentPage = curPage;
                $scope.listItem(FeeNo, OrgId);
            });
        });
    }
    //删除请假记录
    $scope.deleteItem = function (item) {
        if (confirm("您确定要删除该住民的请假记录吗?")) {
            leaveHospRes.delete({ id: item.Id }, function () {
                $scope.Data.leaveHosps.splice($scope.Data.leaveHosps.indexOf(item), 1);
                utility.message($scope.currentResident.Name + "的请假信息删除成功！");
                $scope.getlastLeaveHospInfo("residentSelected");
            });
        }
    };

    $scope.createItem = function (item) {
        //新增请假记录，得到住民ID
        $scope.currentItem.FeeNo = $scope.currentResident.FeeNo;

        leaveHospRes.save($scope.currentItem, function (data) {
            $scope.Data.leaveHosps.push(data.Data);
        });
        $scope.currentItem = {};
    };

    $scope.updateItem = function (item) {
        leaveHospRes.save(item, function (data) {
            $scope.currentItem = {};
        });
    };
    $scope.btncurrentItem = function ()
    {
        $scope.currentItem = {};
        $scope.getlastLeaveHospInfo("residentSelected");
    }


    $scope.rowSelect = function (item) {
        $scope.getlastLeaveHospInfo("rowSelect");
        $scope.currentItem = item;
        $scope.currentItem.StartDate = item.StartDate.replace("T", " ");
        $scope.currentItem.ReturnDate = item.ReturnDate.replace("T", " ");
    };

    $scope.saveEdit = function (item) {
        if (angular.isDefined(item.Id)) {
            $scope.updateItem(item);
        } else {
            $scope.createItem(item);
        }

        $scope.getlastLeaveHospInfo("residentSelected");
        utility.message($scope.currentResident.Name + "的请假信息保存成功！");
    };

    $scope.startendchage = function ()
    {
        if (typeof ($scope.currentItem.StartDate) != "undefault" && typeof ($scope.currentItem.EndDate) != "undefault") {
            if ($scope.currentItem.StartDate > $scope.currentItem.EndDate) {
                utility.message("结束时间不能小于开始时间");
                $scope.currentItem.EndDate = "";
                return;
            }
        }
    }

    //校验上次请假记录
    $scope.checkLastLeaveHosp = function ()
    {
        if ($scope.lastLeaveStartDate != "")
        {
            if ($scope.lastLeaveReturnDate == "")
            {
                utility.message("请完成上次请假记录");
                $scope.currentItem.StartDate = "";
                return;
            }

            if ($scope.lastLeaveReturnDate != "")
            {
                if ($scope.lastLeaveReturnDate > $scope.currentItem.StartDate)
                {
                    utility.message("处于上次请假区间，请选择大于" + $scope.lastLeaveReturnDate + "日期！");
                    $scope.currentItem.StartDate = "";
                    return;
                }
            }
        }
    }

    $scope.dateChange = function () {
        $scope.checkLastLeaveHosp();
        $scope.startendchage();
        if (typeof ($scope.currentItem.StartDate) != "undefault" && typeof ($scope.currentItem.ReturnDate) != "undefault")
        {
            if ($scope.currentItem.StartDate != "" && $scope.currentItem.ReturnDate != "")
            {
                if ($scope.currentItem.StartDate > $scope.currentItem.ReturnDate) {
                    utility.message("实际返回时间不能小于开始时间");
                    $scope.currentItem.ReturnDate = "";
                    return;
                }
                else if ($scope.currentItem.StartDate != "" && $scope.currentItem.ReturnDate != "") {
                    var date1 = Date.parse($scope.currentItem.StartDate.replace("-", "/"));    //开始时间
                    var date2 = Date.parse($scope.currentItem.ReturnDate.replace("-", "/"));    //结束时间
                    var date3 = date2 - date1;  //时间差的毫秒数
                    var days = Math.floor(date3 / (24 * 3600 * 1000))
                    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                    var hours = Math.floor(leave1 / (3600 * 1000))
                    $scope.currentItem.LeHour = days * 24 + hours;
                }
            }
        }
        else {
            $scope.currentItem.LeHour = "";
        }
    }

}]);