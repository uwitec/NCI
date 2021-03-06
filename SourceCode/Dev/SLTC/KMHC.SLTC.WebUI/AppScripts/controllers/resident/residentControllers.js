///创建人:刘美方
///创建日期:2016-02-22
///说明:住民主页信息

///修改人:肖国栋
///修改日期:2016-03-05
///说明:拆分成入住登记和住民信息
angular.module("sltcApp")
    .controller('residentCtrl', ['$scope', '$http', '$state', '$location', 'dictionary', 'utility', 'residentBriefRes', function ($scope, $http, $state, $location, dictionary, utility, residentBriefRes) {
        var id = $state.params.id;

        $scope.init = function () {
            //seajs.use(['/Content/CloudAdmin/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css'
            //    , '/Content/CloudAdmin/js/bootstrap-daterangepicker/daterangepicker-bs3.css'
            //    , '/Content/CloudAdmin/js/datepicker/picker'
            //    , '/Content/CloudAdmin/js/datepicker/picker.date'
            //    , '/Content/CloudAdmin/js/datepicker/picker.time'], function () {
                    //$(".datepicker").datepicker({
                    //    dateFormat: "yy-mm-dd",
                    //    changeMonth: true,
                    //    changeYear: true
                    //    //maxDate: "0d"
                    //});
                //});
            //生日改变
            $scope.birthDayChange = function (birthDay) {
                $scope.Data.AGE = utility.calculateAge(birthDay);
            };

            $scope.listItem();
        };

        $scope.displayMode = "list";
        $scope.currentItem = {};

        $scope.Keyword = "";

        $scope.listItem = function () {
            $scope.residents = residentBriefRes.query();
        }

        $scope.deleteItem = function (item) {
            item.$delete().then(function () {
                $scope.residents.splice($scope.residents.indexOf(item), 1);
            });
            $scope.displayMode = "list";
        };

        $scope.createItem = function (item) {
            new residents(item).$save().then(function (newItem) {
                $scope.residents.push(newItem);
                $scope.displayMode = "list";
            });
        };

        $scope.updateItem = function (item) {
            item.$save();
            $scope.displayMode = "list";
        };


        $scope.editOrCreate = function (item) {
            $scope.currentItem = item ? item : {};
            $scope.displayMode = "edit";
            $scope.disabled = angular.isDefined($scope.currentItem.id);
        };

        $scope.cancelEdit = function () {
            //还原
            if ($scope.currentItem && $scope.currentItem.$get) {
                $scope.currentItem.$get();
            }
            $scope.currentItem = {};

            $scope.displayMode = "list";
        };

        $scope.saveEdit = function (item) {
            if (angular.isDefined(item.id)) {
                $scope.updateItem(item);
            } else {
                $scope.createItem(item);
            }
            $scope.currentItem = {};
        };

        $scope.selectBed = function (data) {
            $scope.currentItem.Floor = data.Floor;
            $scope.currentItem.BedKind = data.BedKind;
            $scope.currentItem.RoomNO = data.RoomNo;
            $scope.currentItem.BedNO = data.Code;
            $scope.currentItem.BedClass = data.BedClass;
            //$scope.SickFlag = data.SickFlag;
            //$scope.RoomFlag = data.RoomFlag;
            //$scope.Protflaf = data.Protflaf;
        };

        $scope.init();
    }])
    .controller("serviceResidentListCtrl", ['$scope', '$http', '$state', '$location', 'personRes', function ($scope, $http, $state, $location, personRes) {
        $scope.search = $scope.reload = function () {
            var keyWord = "";
            if (angular.isDefined($scope.keyword)) {
                keyWord = $scope.keyword;
            }
            var today = new Date();
            personRes.get({ keyWord: keyWord, currentPage: 1, pageSize: 20 }, function (data) {
                $scope.residents = data.Data;
                $.each($scope.residents, function () {
                    if (this.Birthdate != null) {
                        var birthdate = new Date(this.Birthdate);
                        this.Age = today.getFullYear() - birthdate.getFullYear();
                    }
                    else {
                        this.Age = "";
                    }
                });
            });
        };

        $scope.edit = function (item) {
            $state.go('Person.BasicInfo', { id: item.RegNo });
            $state.stateName = "ServiceResidentList";
        }
        $scope.search();
    }]);