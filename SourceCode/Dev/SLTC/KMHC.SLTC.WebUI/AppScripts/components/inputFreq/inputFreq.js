angular.module("extentComponent")
.directive("inputFreq", ['freqRes', function (freqRes) {
    return {
        resctict: "E",
        templateUrl: "/AppScripts/components/inputFreq/inputFreq.html",
        scope: {
            value: "@value",
            callbackFn: "&callback",
            required: "@required",
            searchwords:"@"
        },
        link: function (scope, element, attrs) {
            scope.focus = function () {
                scope.showList = true;
            }

            scope.keydown = function () {
                if (event.keyCode == 9) {
                    scope.showList = false;
                }
            }

            scope.mouseleave = function () {
                scope.showList = false;
            };

            scope.change = function () {
                scope.showList = (angular.isDefined(scope.searchWords) && scope.searchWords != "");
                if (scope.showList) {
                    freqRes.get({ keyWord: scope.searchWords, currentPage: 1, pageSize: 10 }, function (data) {
                        scope.items = data.Data
                    });
                }
            }

            scope.rowClick = function (item) {
                scope.callbackFn({ item: item });//回调函数
                scope.searchWords = item.FREQNO;
                scope.showList = false;//隐藏列表
            };
            //根据关键字过滤结果
            scope.filterItems = function (item) {
                return ((angular.isDefined(item.FREQNO) && item.FREQNO.indexOf(scope.searchWords) >= 0) ||
                        (angular.isDefined(item.FREQNAME) && item.FREQNAME.indexOf(scope.searchWords) >= 0) ||
                        !angular.isDefined(scope.searchWords)
                );
            };

            //监控传入值的改变,同步关键字显示
            scope.$watch("value", function (newValue) {
                if (angular.isDefined(newValue)) {
                    scope.searchWords = newValue;
                }
            });
        }
    }
}]);

