/*
创建人:张凯
创建日期:2016-03-07
说明: 生命体征
*/
angular.module("sltcApp")
.controller("vitalSignsCtrl", ['$scope', '$http', '$filter', '$location', '$state', 'utility', 'residentBriefRes', 'vitalSignRes', 'floorRes', 'roomRes',
    function ($scope, $http, $filter, $location, $state, utility, residentBriefRes, vitalSignRes, floorRes, roomRes) {
        $scope.Data = {};
        $scope.Floor = {};
        $scope.isModify = function (list) {
            if (list != null) {
                var arr = $.grep(list, function (n, i) {
                    return n.CheckType;
                });
                return arr.length > 0;
            }
            else {
                return false;
            }
        }

        //得到当前时间
        var getServiceDate = function () {
            return new Date().currentTime() + ":00";
        }

        $scope.Data.ServiceDate = getServiceDate();

        floorRes.get({ CurrentPage: 1, PageSize: 100 }, function (data) {
            $scope.Data.floors = data.Data;
           
        });
        $scope.getFloor = function (floorName) {

            roomRes.get({ floorName: floorName, CurrentPage: 1, PageSize: 100 }, function (data) {
                $scope.rooms = data.Data;
            });
        }
       

        //初始化数据
        $scope.loadVitalSigns = function () {
            $scope.Floor = $scope.Floor === null ? {} : $scope.Floor;
            var floorName = !$scope.Floor.FloorName ? "" : $scope.Floor.FloorName;
            var roomName = !$scope.Room ? "" : $scope.Room;
            residentBriefRes.get({ floorName: floorName, roomName: roomName }, function (data) {
                $.each(data.Data, function () {
                    this.RecordDate = $scope.Data.ServiceDate;
                });
                $scope.Data.List = data.Data;
            });
        }

        //调整时间
        $scope.changeDate = function () {
            if ($scope.Data.List != null) {
                $.each($scope.Data.List, function () {
                    this.RecordDate = $scope.Data.ServiceDate;
                });
            }
        }

        $scope.Save = function () {
            var saveData = [];
            $.each($scope.Data.List, function () {
                if (this.CheckType) {
                    saveData.push(this);
                }
            });
            vitalSignRes.save(saveData, function () {
                utility.message("保存成功！");
                $scope.loadVitalSigns();//保存成功后刷新初始化界面 Modfied by Duke on 20160809
                //$.each($scope.Data.List, function () {
                //    this.CheckType = false;
                //});
            });
        }
    }])
.controller("vitalSignRecordCtrl", ['$scope', 'dictionary', 'utility', 'vitalSignRes', function ($scope, dictionary, utility, vitalSignRes) {
    $scope.Data = {};
    $scope.currentItem = {};
    // 当前住民
    $scope.currentResident = {}
    $scope.buttonShow = false;
    //选中住民
    $scope.residentSelected = function (resident) {
        $scope.currentResident = resident;//获取当前住民信息
        $scope.listItem($scope.currentResident.RegNo, $scope.currentResident.FeeNo);//加载当前住民的生命体征记录
        $scope.currentItem = {}//清空编辑项
        if (angular.isDefined($scope.currentResident.FeeNo)) {
            $scope.buttonShow = true;
        }
    }
    //获取住民的生命体征
    $scope.listItem = function (regNo, feeNo) {
        $scope.Data.vitalSignList = [];
        vitalSignRes.get({ regNo: regNo, feeNo: feeNo }, function (data) {
            if (angular.isDefined(data.Data)) {
                $scope.Data.vitalSignList = data.Data;
            }
        });
    }
    //删除生命体征记录
    $scope.deleteItem = function (item) {
        if (confirm("您确定要删除该住民的生命体征记录吗?")) {
            vitalSignRes.delete({ id: item.SeqNo }, function () {
                $scope.Data.vitalSignList.splice($scope.Data.vitalSignList.indexOf(item), 1);
                utility.message($scope.currentResident.Name + "的生命体征记录信息删除成功！");
            });
        }
    };


    $scope.createItem = function (item) {
        //新增生命体征记录，得到住民ID
        $scope.currentItem.RegNo = $scope.currentResident.RegNo;
        $scope.currentItem.FeeNo = $scope.currentResident.FeeNo;
        vitalSignRes.save($scope.currentItem, function (data) {
            $scope.Data.vitalSignList.push(data.Data);
        });
        $scope.currentItem = {};
    };

    $scope.updateItem = function (item) {
        vitalSignRes.save(item, function (data) {
            angular.copy(data.Data, item);
        });
        $scope.currentItem = {};
    };


    $scope.rowSelect = function (item) {
        $scope.currentItem = item;
    };

    $scope.saveEdit = function (item) {
        var saveFlag = false;
        if ($scope.Data.vitalSignList.length > 0) {
            $.each($scope.Data.vitalSignList, function (m, list) {
                if (list.SeqNo !== (angular.isDefined(item.SeqNo) ? list.SeqNo : 0) && list.ClassType == item.ClassType && list.RecordDate.toString().substring(0, list.RecordDate.toString().indexOf('T')) == item.RecordDate.toString()) {
                    saveFlag = true;
                }
            });
        }
        if (saveFlag) {
            utility.message("相同班别的生命体征记录已经存在，请查看！");
            return;
        }

        if (angular.isDefined(item.SeqNo)) {
            $scope.updateItem(item);
        } else {
            $scope.createItem(item);
        }

    };
}])
.controller("vitalSignListCtrl",['$scope', '$stateParams', 'utility', 'vitalSignRes', function ($scope, $stateParams, utility, vitalSignRes) {
    var feeNo = $stateParams.feeNo || 0;
    $scope.init = function () {
        $scope.Data = {};
        $scope.currentItem = { FeeNo: feeNo };
        $scope.options = {
            buttons: [],//需要打印按钮时设置
            ajaxObject: vitalSignRes,//异步请求的res
            params: { feeNo: feeNo },
            success: function (data) {//请求成功时执行函数
                $scope.Data = data.Data;
                if ($scope.Data.length > 0) {
                    if (angular.isUndefined($scope.currentItem.SeqNo)) {
                        $scope.edit($scope.Data[0]);
                    }
                } else {
                    $scope.reset();
                }
            },
            pageInfo: {//分页信息
                CurrentPage: 1, PageSize: 10
            }
        }
    };

    //删除生命体征记录
    $scope.delete = function (item) {
        if (confirm("您确定要删除该住民的生命体征记录吗?")) {
            vitalSignRes.delete({ id: item.SeqNo }, function () {
                $scope.reset();
                $scope.options.pageInfo.CurrentPage = 1;
                $scope.options.search();
                utility.message("生命体征记录信息删除成功！");
            });
        }
    };

    $scope.edit = function (item) {
        $scope.currentItem = item;
    };

    $scope.save = function (item) {
        var list = [];
        list.push(item);
        vitalSignRes.save(list, function (data) {
            $scope.options.search();
            utility.message("保存成功！");
        });
    };
    $scope.reset = function () {
        $scope.currentItem = { FeeNo: feeNo };
    }
    $scope.init();
}]);
