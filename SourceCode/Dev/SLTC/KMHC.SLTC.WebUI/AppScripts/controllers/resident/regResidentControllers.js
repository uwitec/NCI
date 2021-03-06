///创建人:刘美方
///创建日期:2016-03-09
///说明:分步登记
//修改记录:
//张正泉 增加保存时将数据保存到residents collection中
/*
陈磊 修改 1.输入姓名后 判断个案姓名是否存在方式 
         2.更改不同职业类别人员显示方式更改为下拉列表
         3.更改校验方式
001	E00.013	护理
002	E00.013	社工
003	E00.013	营养
004	E00.013	职能治疗
005	E00.013	物理治疗
006	E00.013	医师
007	E00.013	心理
008	E00.013	共同
009	E00.013	其他
*/
angular.module("sltcApp")
    .controller('regResidentCtrl', ['$scope', '$state', 'utility', 'cloudAdminUi', '$filter', 'personRes', 'residentBriefRes', 'orgRes', 'empFileRes', 'bedStatusRes',
        function ($scope, $state, utility, cloudAdminUi, $filter, personRes, residentBriefRes, orgRes, empFileRes, bedStatusRes) {

            $scope.init = function () {
                $(".uniform").uniform();
                //cloudAdminUi.initFormWizard();
                $scope.person = { RegNo: "null" };
                $scope.resident = {};
                $scope.resident.InDate = $filter("date")(new Date(), "yyyy-MM-dd");
                $scope.ipdFlag = "";
                $scope.choosePerson = false;
                GetEmpMember();

            }

            $scope.init();

            function GetEmpMember() {
                empFileRes.get({ empNo: '', empName: '', empGroup: '', currentPage: 0, pageSize: 0 }, function (response) {
                    var dest = getEmpMemberByGroup(response.Data);

                    if (!isEmpty(dest)) {
                        for (var i = 0; i < dest.length; i++) {
                            if (dest[i].EmpGroup == "001") {
                                $scope.NurseNoData = dest[i].data;
                            } else if (dest[i].EmpGroup == "002") {
                                $scope.CarerData = dest[i].data;
                            } else if (dest[i].EmpGroup == "003") {
                                $scope.NutritionistData = dest[i].data;
                            } else if (dest[i].EmpGroup == "005") {
                                $scope.PhysiotherapistData = dest[i].data;
                            } else if (dest[i].EmpGroup == "006") {
                                $scope.DoctorData = dest[i].data;
                            }
                        }
                    }
                });
            }

            $scope.ResidentSelected = function (item) {
                if (!isEmpty(item)) {
                    $scope.person.Name = item.Name;
                    $scope.person.Sex = item.Sex;
                    $scope.person.IdNo = item.IdNo;
                    $scope.person.RegNo = item.RegNo;
                }
            }

            $scope.valid = function (current, alert_success, alert_error) {
                var result = false;
                $.ajax({
                    type: "GET",
                    url: "/api/Resident/?idNo=" + $scope.person.IdNo,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $scope.wizform.$setValidity("SameIdNo", true);
                        $scope.wizform.$setValidity("Repeat", true);
                        if (data.Data.length > 0) {
                            var item = data.Data[0];
                            $scope.person.RegNo = item.RegNo;
                            $scope.person.Sex = item.Sex;
                            $scope.person.IdNo = item.IdNo;
                            $scope.person.Age = item.Age;
                            $scope.person.OrgId = item.OrgId;
                            $scope.ipdFlag = item.IpdFlag;
                            if (item.Name != $scope.person.Name) {
                                $scope.wizform.$setValidity("SameIdNo", false);
                            } else if (item.IpdFlag == "I" || item.IpdFlag == "N") {
                                $scope.wizform.$setValidity("Repeat", false);
                            }
                        }
                        if ($scope.wizform.$invalid) {
                            var msg = "";
                            $.each($scope.wizform.$error, function (k, v) {
                                switch (k) {
                                    case "required":
                                        msg += "请输入必填项！<br>";
                                        break;
                                    case "SameIdNo":
                                        msg += "已入院院民中存在相同身份证编号,不能重复入院,请核对！<br>";
                                        break;
                                    case "person.IdNo":
                                        msg += "请输入正确的身份证号码格式！<br>";
                                        break;
                                    case "Repeat":
                                        msg += "该个案已办理入院,请不要重复入院！<br>";
                                        break;
                                    case "pattern":
                                        $.each(v, function (pk, pv) {
                                            switch (pv.$name) {
                                                case "name":
                                                    msg += "名称不能使用特殊字符，请重新输入！<br>";
                                                    break;
                                            }
                                        });
                                        break;
                                }
                            });
                            if (msg.length > 0) {
                                msg = msg.substring(0, msg.length - 4);
                            }
                            alert_error.find("p").html(msg);
                            alert_success.hide();
                            alert_error.show();
                        }
                        else {
                            alert_error.find("p").text("");
                            alert_success.hide();
                            alert_error.hide();
                            result = true;
                        }
                    }
                });
                if (result && ($scope.ipdFlag == "O" || $scope.ipdFlag == "D")) {
                    if (confirm("个案信息存在结案记录,请确定是否重新开案?")) {
                        result = true;
                    }
                    else {
                        result = false;
                    }
                }
                return result;
                /*
                var name = $('#residentName').val();
                $scope.person.Name = name;
                if ($scope.IpdFlag == "I" || $scope.IpdFlag == "N") {
                    utility.message("该个案已办理入院,请不要重复入院！");
                    //$state.go('regResident', null, {
                    //    reload: true
                    //});
                    return false;
                } else if ($scope.IpdFlag == "O" || $scope.IpdFlag == "D") {
                    //if (confirm("个案信息存在结案记录,请确定是否重新开案?")) {

                    //} else {
                    //    $scope.person = {};
                    //    return false;
                    //}
                    utility.confirm("个案信息存在结案记录,请确定是否重新开案?", function (result) {
                        if (!result) {
                            $state.go('regResident', null, {
                                reload: true
                            });
                            return false;
                        }
                    })
                } else {
                    if ($scope.IsExistsName) {
                        //if (!confirm("个案姓名重复,请确认是否真的要输入此笔记录?")) {
                        //    alert(11);
                        //    $state.go('regResident', null, {
                        //        reload: true
                        //    });
                        //    return false;
                        //};
                        utility.confirm("个案姓名重复,请确认是否真的要输入此笔记录?", function (result) {
                            if (!result) {
                                $state.go('regResident', null, {
                                    reload: true
                                });
                                return false;
                            }
                        })
                        return false;
                    }
                    if ($scope.Name != $scope.person.Name && $scope.wizform.$error.RegIdNo) {
                        utility.message("已入院院民中存在相同身份证编号,不能重复入院,请核对!");
                        return false;
                    }
                }
                */
            };

            $scope.submiting = false;
            $scope.saveIpdreg = function () {
                //if ($scope.choosePerson) {
                //    residentBriefRes.get({ regNo: $scope.person.RegNo, type: 0 }, function (data) {                   
                //        if (data.Data) {
                //              utility.message("入住信息保存失败！该住民已经登记了！");
                //              return false;
                //          } else {
                //             return $scope.saveResident();
                //          }
                //    });
                //} 
                $scope.submiting = true;
                $scope.$apply();
                return $scope.saveResident();
            };

            $scope.saveResident = function () {
                if ($scope.ipdFlag != "O" && $scope.ipdFlag != "D") {
                    personRes.save($scope.person, function (data) {
                        $scope.person = data.Data;
                        $scope.saveIpd();
                     });
                } else {
                    $scope.saveIpd();
                }
            }

            $scope.saveIpd = function () {
                $scope.resident.RegNo = $scope.person.RegNo;
                $scope.resident.OrgId = $scope.person.OrgId;
                $scope.resident.IpdFlag = "I";
                residentBriefRes.save($scope.resident, function (data) {
                    bedStatusRes.save({ BedNo: data.Data.BedNo, FEENO: data.Data.FeeNo, BedStatus: 'O' }, function () {
                        $scope.submiting = false;
                        utility.message("入住信息保存成功！");
                        $state.go('ServiceResidentList');
                    });
                });
                return true;
            }

            $scope.KeyPress = function ($event) {
                if (window.event && window.event.keyCode == 13) {
                    window.event.returnValue = false;
                }
            }

            //生日改变
            $scope.birthDayChange = function (birthDay) {
                $scope.person.Age = utility.calculateAge(birthDay);
            }

            $scope.choosePerson = function () {
                $('#modalPerson').modal({
                    backdrop: true,
                    keyboard: true,
                    show: true
                });
            };

            $scope.$on("choosePerson", function (event, data) {
                $scope.choosePerson = true;
                $scope.person = data;
            });
            $scope.chooseBed = function () {
                $('#modalBed').modal({
                    backdrop: true,
                    keyboard: true,
                    show: true
                });
            };

            $scope.$on("chooseBed", function (event, data) {
                if (data.BedStatus == "E") {
                    $scope.resident.Floor = data.Floor;
                    $scope.resident.RoomNo = data.RoomNo;
                    $scope.resident.BedNo = data.BedNo;
                    $scope.resident.BedKind = data.BedKind;
                    $scope.resident.BedType = data.BedType;
                    $('#modalBed').modal('hide');
                }
            });

        }])
    .controller("personModalCtr", ['$scope', '$http', '$state', '$location', 'personRes', function ($scope, $http, $state, $location, personRes) {
        $scope.keyword = "";
        $scope.currentPage = 1;
        $scope.search = $scope.reload = function () {
            personRes.get({ currentPage: $scope.currentPage, pageSize: 10, name: $scope.keyword, idno: $scope.keyword }, function (obj) {
                $scope.Persons = obj.Data;
                var pager = new Pager('pager', $scope.currentPage, obj.PagesCount, function (curPage) {
                    $scope.currentPage = curPage;
                    $scope.search();
                });
            });
        };
        $scope.search();
        $scope.rowClick = function (item) {
            $scope.$emit('choosePerson', item);
            $('#modalPerson').modal('hide');
        };
    }])
    .controller("bedModalCtr", ['$scope', '$http', '$state', '$location', 'bedRes', function ($scope, $http, $state, $location, bedRes) {
        $scope.init = function () {
            $scope.Data = {};
            $scope.PageIndexRender = [];
            $scope.PageInfo = { CurrentPage: 1, PageSize: 10 };
            $scope.PageCount = 1;
            bedRes.get($scope.PageInfo, function (req) {
                $scope.Data.beds = req.Data;
                var len = req.PagesCount;
                $scope.PageCount = len;
                for (var i = 0; i < len; i++) {
                    $scope.PageIndexRender.push({ fn: "", PageNo: i + 1, Name: (i + 1).toString() });
                }
                if (len > 1) {
                    var t = [{ fn: "", PageNo: 1, Name: "首页" }, { fn: "", PageNo: $scope.PageInfo.CurrentPage - 1, Name: "前一页" }];
                    $scope.PageIndexRender = t.concat($scope.PageIndexRender, [{ fn: "", PageNo: $scope.PageInfo.CurrentPage + 1, Name: "后一页" }, { fn: "", PageNo: len, Name: "最后一页" }]);
                }
            });
            $scope.$watch("keyword", function (newValue) {
                if (newValue) {
                    $scope.PageInfo = { CurrentPage: 1, PageSize: 10, keyWords: newValue };
                    bedRes.get($scope.PageInfo, function (data) {
                        $scope.Data.beds = data.Data;
                    });
                }
            });
        };

        $scope.changePage = function (item) {
            if (item.PageNo < 1) { item.PageNo = 1 };
            if (item.PageNo > $scope.PageCount) { item.PageNo = $scope.PageCount };
            $scope.PageInfo.CurrentPage = item.PageNo;
            bedRes.get($scope.PageInfo, function (req) {
                $scope.Data.beds = req.Data;
            });
        }

        $scope.search = $scope.reload = function () {
            $scope.PageInfo = { CurrentPage: 1, PageSize: 10, keyWords: $scope.keyword };
            bedRes.get($scope.PageInfo, function (data) {
                $scope.Data.beds = data.Data;
            });
        };

        $scope.init();
        $scope.rowClick = function (item) {

            $scope.$emit('chooseBed', item);

            //  $('#modalBed').modal('hide');
        };
    }]);

function getEmpMemberByGroup(arr) {
    var map = {}, dest = [];
    for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.EmpGroup]) {
            dest.push({ EmpGroup: ai.EmpGroup, data: [ai] });
            map[ai.EmpGroup] = ai;
        } else {
            for (var j = 0; j < dest.length; j++)
            { var dj = dest[j]; if (dj.EmpGroup == ai.EmpGroup) { dj.data.push(ai); break; } }
        }
    }
    return dest;
}