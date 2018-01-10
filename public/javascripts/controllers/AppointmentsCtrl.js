
(function () {

    angular.module('app')
        .controller('AppointmentsCtrl', AppointmentsCtrl);

    function AppointmentsCtrl($scope, $http) {

        $scope.init = () => { 
            $scope.listAppointments();
            $scope.toggle = false;
        }

 

        $scope.listAppointments = () => {
            $http({
                method: "GET",
                url: "/user/list-appointments"
            }).then(function mySuccess(response) {
                $scope.list = response.data;
            }, function myError(response) {
                console.log(response)
            });
        }
 
    };

})();