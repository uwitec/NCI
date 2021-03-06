///创建人:肖国栋
///创建日期:2016-03-24
///说明:自定义filter

(function () {
    var app = angular.module("extentFilter", []);

    app.filter('dateFormat', function () {
        return function (input, capitalize_index, specified_char) {
            input = input || '';
            if (input == "" || input == null) {
                return "";
            }
            var output = (newDate(input)).format("yyyy-MM-dd");
            return output;
        };
    });

    app.filter('timeFormat', function () {
        return function (input, capitalize_index, specified_char) {
            input = input || '';
            if (input == "" || input == null) {
                return "";
            }
            var output = (newDate(input)).format("yyyy-MM-dd hh:mm:ss");
            return output;
        };
    });

    app.filter('ageFormat', function () {
        return function (input, capitalize_index, specified_char) {
            input = input || '';
            if (input == "" || input == null) {
                return "";
            }
            var output = (new Date().getFullYear() - newDate(input).getFullYear());
            return output;
        };
    });

    app.filter('fileNameFormat', function () {
        return function (input, capitalize_index, specified_char) {
            input = input || '';
            if (input == "" || input == null) {
                return "";
            }
            var fi = input.split('|$|');
            var output = fi[0];
            return output;
        };
    });
    //add by Duke on 20160906 
    app.filter('filePathFormat', function () {
        return function (input, capitalize_index, specified_char) {
            input = input || '';
            if (input == "" || input == null) {
                return "";
            }
            var fi = input.split('|$|');
            if (fi.length < 1) {
                return "";
            }
            var output = fi[1];
            return output;
        };
    });
    app.filter('twTimeFormat', function () {
        return function (input, capitalize_index, specified_char) {
            input = input || '';
            if (input == "" || input == null) {
                return "";
            }
            return input.toTwDate();
        };
    });
    app.filter('trustHtml', ['$sce', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    }]);
    app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
    app.filter('codeText', ['$rootScope', '$timeout', '$http', function ($rootScope, $timeout, $http) {
        return function (input, codeId) {
            if (!angular.isDefined(input)) {
                return "";
            }
            if (!angular.isDefined(codeId)) {
                return input;
            }
            input = input || '';
            var output = '';
            var tmpDics = $rootScope.TmpDics;
            var dics = $rootScope.Dics;//缩写
            if (!angular.isDefined(dics[codeId])) {
                dics[codeId] = {};
                if (tmpDics.length === 0) {
                    $timeout(function () {
                        $http.post("api/Code", { ItemTypes: tmpDics }).success(function (response, status, headers, config) {
                            $.each(response.Data, function (key, value) {
                                dics[key] = response.Data[key];
                            });
                            tmpDics.splice(0, tmpDics.length);
                        });
                    }, 100);
                }
                tmpDics.push(codeId);
            }
            if (dics[codeId].length > 0) {
                if (angular.isDefined(dics[codeId])) {
                    var codeName = "";
                    var arrayVals = input.split(",");
                    angular.forEach(dics[codeId], function (e) {
                        angular.forEach(arrayVals, function (key) {
                            if (e.ItemCode === key) {
                                codeName += e.ItemName + ",";
                            }
                        });
                    });
                    if (codeName != "") {
                        codeName = codeName.substr(0, codeName.length - 1);
                    }
                    output = codeName === "" ? input : codeName;
                }
            }
            return output;
        };
    }]);

    //审批状态: 
    //0：未提交   （数据保存，但尚未提交）
    //1：已撤回   （提交后，下一级机构尚未审批，撤回）
    //3: 待审核    （已提交，待上一级机构审核）
    //6：审核通过 
    //9：审核不通过
    app.filter('appcertStatsFormat', function () {
        return function (input) {
            var output = "";
            switch (input) {
                case 0:
                    output = "未提交";
                    break;
                case 1:
                    output = "已撤回";
                    break;
                case 3:
                    output = "待审核";
                    break;
                case 6:
                    output = "审核通过";
                    break;
                case 9:
                    output = "审核不通过";
                    break;
                case 11:
                    output = "重新审核";
                    break;
            }
            return output;
        };
    });

    app.filter('appcertNsappcareTypeFormat', function () {
        return function (input, parm) {
            var output = "";
            switch (input) {
                case 1:
                    output = "一级专护";
                    break;
                case 2:
                    output = "二级专护";
                    break;
                case 3:
                    output = "机构护理";
                    break;
                default:
                    switch (parm) {
                        case 1:
                            output = "一级专护";
                            break;
                        case 2:
                            output = "二级专护";
                            break;
                        case 3:
                            output = "机构护理";
                            break;
                    };

            }
            return output;
        };
    });

    app.filter('careTypeFormat', function () {
        return function (input, parm) {
            var output = "";
            switch (input) {
                case 1:
                    output = "专护";
                    break;
                case 2:
                    output = "机构护理";
                    break;
                default:
                    switch (parm) {
                        case 1:
                            output = "专护";
                            break;
                        case 2:
                            output = "机构护理";
                            break;
                    };
            }
            return output;
        };
    });

    app.filter('NCIPMonFeeStatusFormat', function () {
        return function (input) {
            var output = "";
            switch (input) {
                case 0:
                    output = "待审核";
                    break;
                case 1:
                    output = "已撤回";
                    break;
                case 10:
                    output = "待审核";
                    break;
                case 20:
                    output = "审核通过";
                    break;
                case 30:
                    output = "已拨款";
                    break;
                case 90:
                    output = "审核不通过";
                    break;


            }
            return output;
        };
    });


    app.filter('fileNameFormat', function () {
        return function (input, capitalize_index, specified_char) {
            input = input || '';
            if (input == "" || input == null) {
                return "";
            }
            var fi = input.split('|$|');
            var output = fi[0];
            return output;
        };
    });

    app.filter('filePathFormat', function () {
        return function (input, capitalize_index, specified_char) {
            input = input || '';
            if (input == "" || input == null) {
                return "";
            }
            var fi = input.split('|$|');
            if (fi.length < 1) {
                return "";
            }
            var output = fi[1];
            return output;
        };
    });

    app.filter('feeTypeFormat', function () {
        return function (input) {
            var output = "";
            switch (input) {
                case "1":
                    output = "药品";
                    break;
                case "2":
                    output = "耗材";
                    break;
                case "3":
                    output = "服务";
                    break;
            }
            return output;
        };
    });
    app.filter('roleTypeFormat', function () {
        return function (input) {
            var output = "";
            switch (input) {
                case "SuperAdmin":
                    output = "超级管理员";
                    break;
                case "Admin":
                    output = "管理员";
                    break;
                case "Normal":
                    output = "普通";
                    break;
            }
            return output;
        };
    });

    app.filter('deductionStatusFormat', function () {
        return function (input) {
            var output = "";
            switch (input) {
                case 0:
                    output = "未扣款";
                    break;
                case 1:
                    output = "已扣款";
                    break;
            }
            return output;
        };
    });

})();