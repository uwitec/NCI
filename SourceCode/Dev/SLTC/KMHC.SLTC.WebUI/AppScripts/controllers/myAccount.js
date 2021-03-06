/*
創建人:Bob Du
創建日期:2016-09-23
說明:个人档案控制器
*/

(function () {
    'use strict';
    angular.module('sltcApp').controller("myAccountCtrl", ['$scope', '$http', '$location', '$stateParams', '$rootScope', '$window', 'utility', 'empFileRes', 'orgRes', 'roleRes', 'deptRes', 'groupRes', 'DCDataDicListRes', myAccountController]);

    function myAccountController($scope, $http, $location, $stateParams, $rootScope, $window, utility, empFileRes, orgRes, roleRes, deptRes, groupRes, DCDataDicListRes) {
        $scope.Data = {};
        $scope.Data.empFile = {};
        $scope.EmpNo = 'null';
        $scope.Info = {};
        $scope.loadModelList = function () {
            roleRes.get({}, function (data) {
                $scope.Info.Roles = data.Data;
            });

            deptRes.get({}, function (data) {
                $scope.Info.Depts = data.Data;
            });

            groupRes.get({}, function (data) {
                $scope.Info.Groups = data.Data;
            });

            $scope.initorglist();
        };

        //如果选择了机构，部门跟着级联过滤zhongyh
        $scope.Orgchange = function () {
            deptRes.get({ orgid: $scope.Data.empFile.OrgId }, function (data) {
                $scope.Info.Depts = data.Data;
            });
        }

        $scope.initorglist = function () {
            //机构数据 SuperAdmin
            DCDataDicListRes.get({ flag: "33", staus: 0, datatyp: "1" }, function (data) {
                $scope.Orglist = data.Data;
                $scope.options.params.orgid = $rootScope.Global.OrganizationId;
            });

            $scope.OrgISSelect = true;
            if ($rootScope.Global.MaximumPrivileges == "SuperAdmin")
            { $scope.OrgISSelect = false; }
        };

        $scope.loadModelList();
        if ($stateParams.id) {
            empFileRes.get({ id: $stateParams.id }, function (data) {
                $scope.Data.empFile = data;
                $scope.EmpNo = $scope.Data.empFile.EmpNo;
            });
            $scope.lockOrg = true;
        }
        else {
            $scope.lockOrg = false;
        }
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.save = function () {
            empFileRes.save($scope.Data.empFile, function (data) {
                $window.history.back();
            });
            utility.message($scope.Data.empFile.EmpName + "的信息保存成功！");
        }
    }
})();