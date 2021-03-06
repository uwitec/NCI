/*
创建人:张凯
创建日期:2016-02-24
说明: 角色管理
*/
angular.module("sltcApp")
.controller("roleListCtrl", ['$scope', '$http', '$location', '$rootScope', 'roleRes', 'DCDataDicListRes', 'utility', function ($scope, $http, $location, $rootScope, roleRes, DCDataDicListRes, utility) {
    $scope.Data = {};
    $scope.loadRoles = function () {
        $scope.options = {
            buttons: [],//需要打印按钮时设置
            ajaxObject: roleRes,//异步请求的res
            params: { roleName: "", orgid: $rootScope.Global.OrganizationId },
            success: function (data) {//请求成功时执行函数
                $scope.Data.Roles = data.Data;
            },
            pageInfo: {//分页信息
                CurrentPage: 1, PageSize: 10
            }
        }
        //roleRes.get({ roleName: "", roleType: "Normal", currentPage: 1, pageSize: 10 }, function (data) {
        //    $scope.Data.Roles = data.Data;
        //});
        //$scope.initorglist();
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

    $scope.RoleDelete = function (item) {
        if (confirm("您确定删除该角色信息吗?")) {
            roleRes.delete({ id: item.RoleId }, function (data) {
                utility.message(data.ResultMessage);

                if (data.ResultCode == 1)
                {
                    $scope.Data.Roles.splice($scope.Data.Roles.indexOf(item), 1);
                }
            });
        }
    }

    $scope.loadRoles();
}])
.controller("roleEditCtrl", ['$scope', '$http', '$location', '$stateParams', '$rootScope', 'dictionary', 'roleRes', 'moduleRes', 'DCDataDicListRes', 'utility', function ($scope, $http, $location, $stateParams, $rootScope, dictionary, roleRes, moduleRes, DCDataDicListRes, utility) {
    $scope.Data = {};
    $scope.RoleId = "0"
    if ($stateParams.id) {
        $scope.RoleId = $stateParams.id;
        roleRes.get({ id: $stateParams.id }, function (data) {
            $scope.Data.Role = data.Data;
            $scope.RoleId = data.Data.RoleId;
            $scope.isOrgAdmin = data.Data.RoleType == "Admin" ? 1 : 0;//TODO 采用js枚举
        });
    }
    else {
        $scope.Data.Role = {};
        $scope.Data.Role.Status = 1;
    }

    $scope.change = function () {
        $('#roleName').trigger('blur');
    };

    
    var treeHelper = new TreeHelper(moduleRes, "#moduleTree", { id: $scope.RoleId, type: "tree", loadTreeByRole: true });

    $scope.expandAll = function () {
        treeHelper.expandAll();
    }

    $scope.collapseAll = function ()
    {
        treeHelper.collapseAll();
    }
    $scope.chooseAll = function () {
        treeHelper.checkAll();
    }

    $scope.cancelChooseAll = function () {
        treeHelper.uncheckAll();
    }
    $scope.save = function () {
        $scope.Data.Role.CheckModuleList = treeHelper.getChecked();
        $scope.Data.Role.RoleType = $scope.isOrgAdmin? "Admin" : "Normal";//TODO 采用js枚举
        roleRes.save($scope.Data.Role, function (data) {
            $location.url('/NCIA/RoleList');
            utility.message("修改成功");
        });
    }

    //$scope.initorglist = function () {
    //    //机构数据 SuperAdmin
    //    DCDataDicListRes.get({ flag: "33", staus: 0, datatyp: "1" }, function (data) {
    //        $scope.Orglist = data.Data;
    //    });

    //    $scope.OrgISSelect = true;
    //    if ($rootScope.Global.MaximumPrivileges == "SuperAdmin")
    //    { $scope.OrgISSelect = false; }
    //};

    treeHelper.loadTree();
    //$scope.initorglist();


}])
.controller("roleEditNewCtrl", ['$scope', '$http', '$location', '$stateParams', '$rootScope', 'dictionary', 'roleNewRes', 'moduleRes', 'DCDataDicListRes', 'utility', function ($scope, $http, $location, $stateParams, $rootScope, dictionary, roleNewRes, moduleRes, DCDataDicListRes, utility) {
    $scope.Data={};
    $scope.RoleId = "0"
    if ($stateParams.id) {
        $scope.RoleId = $stateParams.id;
        roleNewRes.get({ id: $stateParams.id }, function (data) {
            $scope.Data.Role = data.Data;
            $scope.RoleId = data.Data.RoleId;
            $scope.isOrgAdmin = data.Data.RoleType == "Admin" ? 1 : 0;//TODO 采用js枚举
        });
    }
    else {
        $scope.Data.Role = {};
        $scope.Data.Role.Status = 1;
    }

    $scope.change = function () {
        $('#roleName').trigger('blur');
    };

    $scope.init=function () {
        $http({
            url:'/api/ModuleNew/'+$scope.RoleId+'?loadTreeByRole=true&type=tree',
            method:'get'
        })
            .success(function (data) {
                $scope.data=data;
                var tpl   =  $("#roleEditTpl").html();

                //预编译模板
                var template = Handlebars.compile(tpl);

                //匹配json内容
                var html = template($scope.data);
                //输入模板
                $("#moduleTreeNew").html(html);


            })
            .error(function (err) {
                utility.message(err)
            })
        $("#moduleTreeNew").on('change','.moduleTree-list-tit input:checkbox',function (e) {
            e.stopPropagation();
            //  一级菜单选中
            var _this = $(this);
            var parentCheck = _this.prop('checked');

            var child_list = _this.closest('.moduleTree-wrap').find('ul li .menucheck');
            child_list.prop("checked",parentCheck);
            check_all();
        })

        $("#moduleTreeNew").on('click','span.icon',function (e) {
            e.stopPropagation();
            var _this = $(this);
            _this.toggleClass('open');
            _this.closest('.moduleTree-list-tit').siblings('ul').slideToggle();
        })
        $("#moduleTreeNew").on('click','.moduleTree-list-tit',function (e) {
            e.stopPropagation();
            var _this = $(this);
            _this.find('span.icon').toggleClass('open');
            _this.closest('.moduleTree-list-tit').siblings('ul').slideToggle();
        })

        $("#moduleTreeNew").on('click','.moduleTree-list-tit label',function (e) {
            e.stopPropagation();
        })

        $('#moduleTreeNew').on('change','.menucheck',function (e) {
            e.stopPropagation();
            var _this= $(this);

            var list_tit_check = _this.closest('.moduleTree-wrap').find('.moduleTree-list-tit input:checkbox');

            var menuCheck = _this.closest('ul').find('.menucheck');
            var len = menuCheck.length;
            var checkedMenuLen=0;
            menuCheck.each(function (item, idx) {
                if($(this).prop('checked'))
                    checkedMenuLen++;
            })
            if(checkedMenuLen){
                list_tit_check.prop('checked',true)
            }else {
                list_tit_check.prop('checked',false)
            }
            check_all();

        })
        //点击展开
        $('#moduleTreeNew').on('change','#selectAllMenu',function (e) {
            var _this = $(this);
            var allCheck = _this.prop('checked');
            $('.moduleTree-wrap .moduleTree-list-tit input:checkbox').prop('checked',allCheck);
            $('.moduleTree-wrap ul li .menucheck').prop('checked',allCheck);

        })

        function check_all() {
            var selectAllMenu = $("#selectAllMenu");
            var list_tit_check_all = $('#moduleTreeNew').find('.allcheck');
            var all_len = list_tit_check_all.length;
            var checkeAlldMenuLen=0;
            list_tit_check_all.each(function () {
                if($(this).prop('checked')){
                    checkeAlldMenuLen++;
                }

            })
            if(checkeAlldMenuLen == all_len){
                selectAllMenu.prop('checked',true)
            }else {
                selectAllMenu.prop('checked',false)
            }
        }

    }
    function getChecked(){
        var obj = {},list=[];
        $('#moduleTreeNew .moduleTree-wrap').each(function (item,idx) {
            var p_node = {},_this= $(this),_titCheck=_this.find('.moduleTree-list-tit input:checkbox') ;
            if(_titCheck.prop('checked')){
                p_node.text=_titCheck.prop('name');
                p_node.href=_titCheck.prop('value');
                p_node.moduleId=_titCheck.prop('id');
                p_node.state={'checked':_titCheck.prop('checked')};
                p_node.nodes=[];
                _this.find('ul li').each(function () {
                    var _that = $(this),arr=[],c_node = {},_menuCheck=_that.find('input.menucheck');
                    if(_menuCheck.prop('checked')){
                        c_node.text=_menuCheck.prop('name');
                        c_node.href=_menuCheck.prop('value');
                        c_node.moduleId=_menuCheck.prop('id');
                        c_node.state={'checked':_menuCheck.prop('checked')};
                        c_node.modulesetting={
                            'add':_that.find('input[name="add"]').prop('checked'),
                            'update':_that.find('input[name="update"]').prop('checked'),
                            'select':_that.find('input[name="select"]').prop('checked'),
                            'delete':_that.find('input[name="delete"]').prop('checked')
                        };
                        p_node.nodes.push(c_node);
                        list.push(c_node);
                    }
                })
                list.push(p_node);
            }

        })
        return list;
    }
    $scope.save = function () {
        $scope.Data.Role.CheckModuleList = getChecked();
        $scope.Data.Role.RoleType = $scope.isOrgAdmin? "Admin" : "Normal";//TODO 采用js枚举
        roleNewRes.save($scope.Data.Role, function (data) {
            $location.url('/NCIA/RoleList');
            utility.message("修改成功");
        });
    }
    $scope.init();

}])