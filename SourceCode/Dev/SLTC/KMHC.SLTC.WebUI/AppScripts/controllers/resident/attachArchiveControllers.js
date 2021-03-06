///创建人:肖国栋
///创建日期:2016-02-23
///说明:附加管理

angular.module("sltcApp")
.controller("attachArchiveCtrl", ['$scope', 'dictionary', 'webUploader', 'attachArchiveRes', function ($scope, dictionary, webUploader, attachArchiveRes) {
    var loadData = function () {
        if (!$scope.person.AttachArchives) {
            $scope.person.AttachArchives = [];
            if (!!$scope.person.FeeNo) {
                attachArchiveRes.get({ feeNo: $scope.person.FeeNo, currentPage: 1, pageSize: 10 }, function (data) {
                    if (data.Data.DocPath != null && typeof (data.Data.DocPath) != "undefined") {
                        var fi = data.Data.DocPath.split('|$|');
                        if (fi.length == 2) {
                            data.Data.SavedLocation = fi[1];
                            data.Data.FileName = fi[0];
                        } else if (fi.length == 1) {
                            data.Data.SavedLocation = fi[0];
                            data.Data.FileName = fi[0];
                        }
                    }
                    angular.copy(data.Data, $scope.person.AttachArchives);
                });
            }
        }
    }

    //$scope.displayMode = "list";
    $scope.currentItem = null;
    $scope.Keyword = "";

    $scope.init = function () {
        loadData();
        //$scope.AttachArchives = attachArchiveRes.query();
    }

    $scope.$on('LoadTabData', function (data) {
        loadData();
    });

    $scope.deleteItem = function (item) {
        //item.$delete().then(function() {
        //    $scope.AttachArchives.splice($scope.AttachArchives.indexOf(item), 1);
        //});
        $scope.person.AttachArchives.splice($scope.person.AttachArchives.indexOf(item), 1);
        //$scope.displayMode = "list";
    };

    $scope.createItem = function(item) {
        //new attachArchiveRes(item).$save().then(function(newItem) {
        //    $scope.AttachArchives.push(newItem);
        //    $scope.displayMode = "list";
        //});
        $scope.person.AttachArchives.push(item);
        //$scope.displayMode = "list";
    };

    $scope.updateItem = function (item) {
        //$scope.displayMode = "list";
    };


    $scope.edit = function (item) {
        $scope.currentItem = item ? item : {};
        $scope.currentItemCopy = {};
        angular.copy($scope.currentItem, $scope.currentItemCopy);
        //$scope.displayMode = "edit";
        $("#attachArchiveModal").modal("toggle");
    };
    $scope.create = function () {
        $scope.currentItem = {};
        $scope.currentItemCopy = {};
        angular.copy($scope.currentItem, $scope.currentItemCopy);
        //$scope.displayMode = "edit";
        $("#attachArchiveModal").modal("toggle");
    };

    $scope.cancelEdit = function () {
        //还原
        //if ($scope.currentItem && $scope.currentItem.$get) {
        //    $scope.currentItem.$get();
        //}
        angular.copy($scope.currentItemCopy, $scope.currentItem);
        $scope.currentItem = {};
        //$scope.displayMode = "list";
        $("#attachArchiveModal").modal("toggle");
    };

    $scope.saveEdit = function (item) {
        item.DocPath = '{0}|$|{1}'.format(item.FileName, item.SavedLocation);
        if (angular.isDefined(item.$$hashKey)) {
            $scope.updateItem(item);
        } else {
            $scope.createItem(item);
        }
        $("#attachArchiveModal").modal("toggle");
    };

    $scope.clear = function () {
        $scope.currentItem.DocPath = "";
    }

    $scope.init();
}])
.controller("attachArchiveEditCtrl", ['$scope', 'webUploader', function ($scope, webUploader) {
    webUploader.init('#ArchiveFilePicker', { category: 'ArchiveFile' }, '文件', 'doc,docx', 'doc/*', function (data) {
        if (data.length > 0) {
            //$scope.currentItem.DocPath = data[0].SavedLocation;
            $scope.currentItem.SavedLocation = data[0].SavedLocation;
            $scope.currentItem.FileName = data[0].FileName;
            $scope.$apply();
        }
    });
}]);

