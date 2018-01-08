
(function () {

    angular.module('app')
        .controller('AppointmentsCtrl', AppointmentsCtrl);

    function AppointmentsCtrl($scope, $http) {

        $scope.init = (role) => { 
            $scope.role = role;
            $scope.listAppointments();
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


 

        $scope.listAppointments = () => {
            $http({
                method: "GET",
                url: "/user/list-appointments",
                params: { role : $scope.role }
            }).then(function mySuccess(response) {
                $scope.list = response.data;
            }, function myError(response) {
                console.log(response)
            });
        }
 
    };

})();