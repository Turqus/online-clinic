(function () {

    angular.module('app')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope, $http, $location) {

        $scope.init = () => {
            $scope.toggle = false;
        }


        $scope.expandMenu = (name) => {

            if ($scope.toggle == true && $scope.currentlyMenu == name) {
                $scope.toggle = !$scope.toggle;
            } else {
                $scope.toggle = true;
            }

            $scope.currentlyMenu = name;
        }
    }

})();










