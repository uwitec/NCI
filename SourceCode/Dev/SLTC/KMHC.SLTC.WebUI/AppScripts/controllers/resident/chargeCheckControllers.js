/*
创建人:张凯
创建日期:2016-02-28
说明: 收费/审核
*/
angular.module("sltcApp")
.controller("chargeCheckCtrl", ['$scope', '$state', 'utility', 'chargeCheckRes', function ($scope, $state, utility, chargeCheckRes) {
    //var id = $state.params.id;
    $scope.buttonShow = false;
    //选中住民
    $scope.residentSelected = function (resident) {
        $scope.currentItem = {};
        $scope.currentResident = resident;//获取当前住民信息
        $scope.initChargeCheck();//加载当前住民的入住审核
        if (angular.isDefined($scope.currentResident.FeeNo)) {
            $scope.buttonShow = true;
        }
    }
    $scope.options = {
        buttons: [],//需要打印按钮时设置
        ajaxObject: chargeCheckRes,//异步请求的res
        params: { feeNo: 0, orgId: 0 },
        success: function (data) {//请求成功时执行函数
            $scope.Datas = data.Data;
            if ($scope.Datas.length > 0) {
                $scope.rowSelect(data.Data[0]);
            }
        },
        pageInfo: {//分页信息
            CurrentPage: 1, PageSize: 10
        }
    }

    //加载入住审核
    $scope.initChargeCheck = function () {
        if ($scope.currentResident) {
            $scope.options.params.feeNo = $scope.currentResident.FeeNo;
            $scope.options.params.orgId = $scope.currentResident.OrgId;
            $scope.options.search();
        }
    }

    $scope.deleteItem = function (item) {
        if (confirm("确定删除该信息吗?")) {
            chargeCheckRes.delete({ id: item.Id }, function (data) {
                $scope.options.pageInfo.CurrentPage = 1;
                $scope.options.search();
                utility.message("删除成功");
            });
        }
    };

    $scope.createItem = function (item) {
        //新增需求管理记录，得到住民ID
        $scope.currentItem.FeeNo = $scope.currentResident.FeeNo;
        $scope.currentItem.RegNo = $scope.currentResident.RegNo;
        $scope.currentItem.OrgId = $scope.currentResident.OrgId;
        chargeCheckRes.save($scope.currentItem, function (data) {
            $scope.options.search();
        });
        $scope.currentItem = {};
    };

    $scope.updateItem = function (item) {
        chargeCheckRes.save($scope.currentItem, function (data) {
            $scope.options.search();
        });
        $scope.currentItem = {};
    };


    $scope.rowSelect = function (item) {
        $scope.currentItem = item;
    };

    $scope.saveEdit = function (item) {
        if (!utility.Validation($scope.myForm.$error)) {
            return;
        }
        if (angular.isDefined(item.Id)) {
            $scope.updateItem(item);
        } else {
            $scope.createItem(item);
        }
        utility.message($scope.currentResident.Name + "的辅助资讯信息保存成功！");
    };



}]);