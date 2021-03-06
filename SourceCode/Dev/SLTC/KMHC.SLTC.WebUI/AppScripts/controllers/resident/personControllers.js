///创建人:张正泉
///创建日期:2016-03-09
///说明:人员信息列表

angular.module("sltcApp")
    .controller('personCtrl', ['$scope', '$location', '$state', '$filter', 'utility', 'personRes', function ($scope, $location, $state, $filter, utility, personRes) {

        var id = $state.params.id;
        $scope.init = function () {
            $scope.person = {};
            $scope.RegNo = "0";
            if (id && id != "0") {
                $scope.isAdd = false;
                personRes.get({ id: id }, function (data) {
                    // angular.copy(data.Data, $scope.person);
                    $scope.person = data.Data;
                    $scope.$broadcast('LoadTabData', null);
                });
            } else {
                $scope.isAdd = true;
                $scope.person = {
                    Gender: "001",
                    BirthDay: "1956-01-01",
                    CreateDate: $filter("date")(new Date(), "yyyy-MM-dd"),
                    ImgUrl: "/Images/0.png"
                };
            }
        }
        $scope.init();
        $scope.save = function () {
            personRes.save($scope.person, function (data) {
                if (data.ResultMessage) {
                    utility.message(data.ResultMessage);
                    return;
                }
                utility.message($scope.person.Name + "的信息保存成功！");
                if (angular.isDefined($state.stateName)) {
                    $state.go($state.stateName);
                }
                else {
                    $location.url('/angular/PersonList');
                }
                //$window.history.back();
            });
        };

        $scope.person.Age = function ()
        {
            return $filter("ageFormat")(person.Brithdate);
        }
    }])
    .controller("personListCtrl", ['$scope', '$http', '$state', '$location', 'utility', 'personRes', function ($scope, $http, $state, $location, utility, personRes) {
        //$scope.currentPage = 1;
        //$scope.search = $scope.reload = function () {
        //    var keyWord = "";
        //    if (angular.isDefined($scope.keyword)) {
        //        keyWord = $scope.keyword;
        //    }
        //    personRes.get({ keyWord: keyWord, currentPage: $scope.currentPage, pageSize: 10 }, function (response) {
        //        $scope.Persons = response.Data;
        //        var pager = new Pager('pager', $scope.currentPage, response.PagesCount, function (curPage) {
        //            $scope.currentPage = curPage;
        //            $scope.search();
        //        });
        //    });
        //};

        $scope.options = {
            buttons: [],//需要打印按钮时设置
            ajaxObject: personRes,//异步请求的res
            params: { keyWord: "" },
            success: function (data) {//请求成功时执行函数
                $scope.Persons = data.Data;
            },
            pageInfo: {//分页信息
                CurrentPage: 1, PageSize: 10
            }
        }
        //根据关键字过滤结果
        $scope.filterItems = function (item) {
            if ($scope.keyword) {
                return (angular.isDefined(item.IdNo) && item.IdNo.indexOf($scope.keyword) >= 0)
                 ||
                 (angular.isDefined(item.Name) && item.Name.indexOf($scope.keyword) >= 0)
            }
            return true;
        };

        $scope.edit = function (item) {

            $state.go('Person.BasicInfo', { id: item.RegNo });
            $state.stateName = "PersonList";
        }

        $scope.delete = function (id) {
            if (confirm("确定删除该住民信息吗?")) {
                personRes.delete({ id: id }, function (data) {
                    $scope.options.search();
                    utility.message("删除成功");
                });
            }
        };
    }]);