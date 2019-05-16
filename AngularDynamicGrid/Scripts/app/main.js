angular.module('demo', [])
    .service('LocalStorage', [function () {
        var Service = {};
        var hasInvoice = function () {
            return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
        };
        Service.getInvoice = function () {
            if (hasInvoice()) {
                return JSON.parse(localStorage['invoice']);
            } else {
                return false;
            }
        };
        return Service;

    }])
    .controller('DemoCtrl', ['$scope', '$http', 'LocalStorage',
        function ($scope, $http, LocalStorage) {

            (function init() {
                !function () {
                    var invoice = LocalStorage.getInvoice();
                    $scope.invoice = invoice ? invoice : 0;
                }();
            })()
            $scope.addItem = function () {
                $scope.invoice.items.push({ qty: 0, cost: 0, description: "" });
            }
            $scope.removeItem = function (item) {
                $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
            };
        }])