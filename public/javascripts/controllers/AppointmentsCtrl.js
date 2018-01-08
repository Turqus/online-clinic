
(function () {

    angular.module('app')
        .controller('AppointmentsCtrl', AppointmentsCtrl);

    function AppointmentsCtrl($scope, $http) {

        $scope.init = () => { 
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
                params: { doctorID: $scope.doctorID }
            }).then(function mySuccess(response) {
                $scope.list = response.data;
            }, function myError(response) {
                console.log(response)
            });
        }
 
    };

})();