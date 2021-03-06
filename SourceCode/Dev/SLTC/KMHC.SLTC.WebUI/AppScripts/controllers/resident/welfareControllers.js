///创建人:刘美方
///创建日期:2016-02-22
///说明:福利信息

angular.module("sltcApp")
.controller('welfareCtrl', ['$scope', 'utility', 'welfareRes', function ($scope,utility,welfareRes) {
    $scope.reginsdtl = {};
    $scope.Data = {};
    $scope.buttonShow = false;
    $scope.maxErrorTips = 3;
    //cloudAdminUi.initDatepicker();
    //选中住民
    $scope.residentSelected = function (resident) {
        $scope.currentResident = resident;//获取当前住民信息
        $scope.init();//加载当前住民
        if (angular.isDefined($scope.currentResident.FeeNo)) {
            $scope.buttonShow = true;
        }
        welfareRes.get({ idNo: $scope.currentResident.IdNo }, function (data) {
            $scope.Data = data.Data;
            $scope.Data.RecordsCount = data.RecordsCount;
        });
    }

    
    $scope.init = function () {
        if ($scope.currentResident.FeeNo) {
            welfareRes.get({ id: $scope.currentResident.FeeNo }, function (data) {
                $scope.reginsdtl = data;
                if ($scope.reginsdtl.BookNo == null) {
                    $scope.reginsdtl.BookNo = $scope.currentResident.IdNo;
                }
            });
        }      
    }
    $scope.saveItem = function () {
        if (!$scope.Validation()) {
            return;
        }
        $scope.reginsdtl.FeeNo = $scope.currentResident.FeeNo;
        $scope.reginsdtl.RegNo = $scope.currentResident.RegNo;
        $scope.reginsdtl.OrgId = $scope.currentResident.OrgId;
        welfareRes.save($scope.reginsdtl, function (data) {
            utility.message("保存成功");
        });
    };

    $scope.Validation = function () {
        var errorTips = 0;
        if (angular.isDefined($scope.myForm.$error.required)) {
            var msg = "";
            for (var i = 0; i < $scope.myForm.$error.required.length; i++) {
                msg = $scope.myForm.$error.required[i].$name + " 为必填项";
                utility.msgwarning(msg);
                errorTips++;
                if (errorTips >= $scope.maxErrorTips) {
                    return false;
                }
            }
        }

        if (angular.isDefined($scope.myForm.$error.maxlength)) {
            var msg = "";
            for (var i = 0; i < $scope.myForm.$error.maxlength.length; i++) {
                msg = $scope.myForm.$error.maxlength[i].$name + "超过设定长度 ";
                utility.msgwarning(msg);
                errorTips++;
                if (errorTips >= $scope.maxErrorTips) {
                    return false;
                }
            }
        }

        if (angular.isDefined($scope.myForm.$error.pattern)) {
            var msg = "";
            for (var i = 0; i < $scope.myForm.$error.pattern.length; i++) {
                msg = $scope.myForm.$error.pattern[i].$name + getValidateMsg($scope.myForm.$error.pattern[i].$name);
                utility.msgwarning(msg);
                errorTips++;
                if (errorTips >= $scope.maxErrorTips) {
                    return false;
                }
            }
        }



        if (errorTips > 0) { return false; }
        return true;
    }

}]);