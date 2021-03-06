angular.module("extentComponent")
.directive("residentCard", ['residentBriefRes', 'floorRes', function (residentBriefRes, floorRes) {
    return {
        resctict: "EA",
        templateUrl: "/AppScripts/components/residentCard/residentCard.html",
        scope: {
            //value: "@value",
            callbackFn: "&callback"
        },
        controller: ['$scope', function ($scope) {
            $scope.Name = "";
            $scope.IpdFlag = "I";

            $scope.$watch('FloorId', function (newValue, oldValue, scope) {
                $scope.FilterFloorId = newValue == null ? undefined : newValue;
            });
            $scope.currentResident = {
                Name: "---",
                ImgUrl: "/Images/defaultavatar.png"
            };
            floorRes.get({ floorName: "" }, function (data) {
                $scope.floors = data.Data;
            });
            var readList = function () {
                residentBriefRes.get({ keyWord: "", ipdFlag: "", currentPage: 1, pageSize: 1000 }, function (data) {
                    $scope.residents = data.Data;
                });
            };
            $scope.afterSelected = function (item) {
                $scope.currentResident = item;//设置ResidentCard的currentResident
                if (!$scope.currentResident.ImgUrl) {
                    if (item.ImgUrl != "" && item.ImgUrl!=null)
                        $scope.currentResident.ImgUrl = item.ImgUrl;//PhotoPath.PhotoPath;
                    else
                        $scope.currentResident.ImgUrl = "/Images/defaultavatar.png";
                }
                $scope.callbackFn({ resident: item });//回调
            }
            $scope.$on('refreshResidentList', function () {
                readList();
            });
            readList();
        }],
        link: function (scope, element, attrs) {
            if (attrs.layoutDirection) {
                if (attrs.layoutDirection == "horizontal") {
                    element.find("#cardImgArea").removeClass("col-sm-12").addClass("col-sm-4");
                    element.find("#cardInfoArea").removeClass("col-sm-12").addClass("col-sm-8");
                } else if (attrs.layoutDirection == "auto") {
                    element.find("#cardImgArea").addClass("modal-card");
                    element.find("#cardInfoArea").addClass("modal-card");
                }
            }
        }
    }
}]);
