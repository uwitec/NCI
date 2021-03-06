/*
创建人:张凯
创建日期:2016-02-24
说明: 用户管理
*/
angular.module("sltcApp")
.controller("userListCtrl", ['$scope', '$http', '$location', '$state', '$rootScope', 'userRes', 'DCDataDicListRes', 'utility', function ($scope, $http, $location, $state, $rootScope, userRes, DCDataDicListRes, utility) {
    $scope.Data = {};
    $scope.loadUsers = function () {
        $scope.options = {
            buttons: [],//需要打印按钮时设置
            ajaxObject: userRes,//异步请求的res
            params: { keyWord: "", orgid: $rootScope.Global.OrganizationId },
            success: function (data) {//请求成功时执行函数
                $scope.Data.Users = data.Data;
            },
            pageInfo: {//分页信息
                CurrentPage: 1, PageSize: 10
            }
        }
    }

    $scope.UserDelete = function (item) {
        if (confirm("您确定删除该用户信息吗?")) {
            userRes.delete({ id: item.UserId }, function (data) {
                if (data.ResultCode == 1) {
                    utility.message("删除成功");
                    $scope.Data.Users.splice($scope.Data.Users.indexOf(item), 1);
                }
                else {
                    utility.msgwarning(data.ResultMessage);
                }
            });
        }
    }

    //$scope.initorglist = function () {
    //    //机构数据 SuperAdmin
    //    DCDataDicListRes.get({ flag: "33", staus: 0, datatyp: "1" }, function (data) {
    //        $scope.Orglist = data.Data;
    //        $scope.options.params.orgid = $rootScope.Global.OrganizationId;
    //    });

    //    $scope.OrgISSelect = true;
    //    if ($rootScope.Global.MaximumPrivileges == "SuperAdmin")
    //    { $scope.OrgISSelect = false; }
    //};

    $scope.loadUsers();
}])
.controller("userEditCtrl", ['$filter', '$scope', '$http', '$location', 'utility', '$stateParams', '$rootScope', 'DCDataDicListRes', 'userRes', 'roleRes', function ($filter,$scope, $http, $location, utility, $stateParams, $rootScope, DCDataDicListRes, userRes, roleRes) {
    $scope.Data = {};
    $scope.isPwdChanged = true;
    $scope.Data.User = {};
    $scope.Roles = [];
    roleRes.get({ pageSize: 0, orgid: $rootScope.Global.OrganizationId}, function (obj) {
        $scope.Roles = obj.Data;
    });
    if ($stateParams.id) {
        $scope.isPwdChanged = false;
        userRes.get({ id: $stateParams.id }, function (data) {
            $scope.Data.User = data;
        });
    } else {
        $scope.Data.User.Status = 1;
    }

    $scope.save = function () {
        if (!$scope.Data.User.RoleId) {
            utility.message("角色为必填项!");
            return;
        }
        if (isEmpty($scope.Data.User.UserId)) {
            if (isEmpty($scope.newPassword)) {
                utility.message("密码不能为空!");
                return;
            }

            $scope.Data.User.Password = $scope.newPassword;
            var url = "api/users?&account=" + $scope.Data.User.Account;
            $http.get(url).success(function (response) {
                if (response!=null) {
                    alert("该账户已存在！");
                    return;
                }
                userRes.save($scope.Data.User, function (data) {
                    $location.url('/NCIA/UserList');
                });
            });
        }
        else {

            if (angular.isDefined($scope.newPassword) && $scope.newPassword != "") {
                $scope.Data.User.Password = $scope.newPassword;
            }
            userRes.save($scope.Data.User, function (data) {
                $location.url('/NCIA/UserList');
            });
        }
    }

}]);
