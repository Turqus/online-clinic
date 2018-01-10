(function () {

    angular.module('app')
        .controller('FindPatientCtrl', FindPatientCtrl);

    function FindPatientCtrl($scope, $http, $location) {

        $scope.init = () => {
            $scope.toggle = false;
            $scope.loadPatientCards();
        }


        $scope.findPatient = (patientName) => {
            var params = {};
            params.name = patientName;

            $http({
                method: "GET",
                url: "/find",
                params: params
            }).then(function mySuccess(response) {
                $scope.finededPatient = response.data;
            }, function myError(response) {
                console.log(response);
            });
        }
    }

})();





 


