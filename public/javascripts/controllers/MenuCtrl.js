(function () {

    angular.module('app')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope, $http, $location) {

        $scope.init = () => {
        $scope.toggle = false;
            // $scope.selectedCard = [];
            // $scope.loadPatientCards();
        }


        $scope.expandMenu = (name) => {

            if ($scope.toggle == true && $scope.currentlyMenu == name) {
                $scope.toggle = !$scope.toggle;
            } else {
                $scope.toggle = true;
            }

            $scope.currentlyMenu = name;
        }

        // $scope.test = (message, recipient) => {
        //     if (recipient === 'Recepcji') message.recipient = 'bartlomiejflis94@gmail.com';
        //     else if (recipient === 'Danuta Antoni') message.recipient = 'bartlomiejflis94@gmail.com';
        //     else if (recipient === 'Marek Antoni') message.recipient = 'bartlomiejflis94@gmail.com';
        //     else if (recipient === 'Jakub Antoni') message.recipient = 'bartlomiejflis94@gmail.com';


        //     $http({
        //         method: 'POST',
        //         url: '/contact',
        //         data: { message }
        //     }).then(function successCallback(response) {
        //         console.log('yoyo', response);
        //     }, function errorCallback(response) {
        //         console.log(response, 'error')
        //     });
        // }


        // $scope.loadPatientCards = () => {

        //     $http({
        //         method: "GET",
        //         url: "/user/patient-card"
        //     }).then(function mySuccess(response) {
        //         $scope.patientCard = response.data;
        //         $scope.card = '0';

        //         $scope.changeCard(0);
        //     }, function myError(response) {
        //         console.log(response)
        //     });
        // }

    //     $scope.changeCard = (indexCard) => {
    //         $scope.selectedCard = $scope.patientCard[indexCard].registry;
    //     }

    //     $scope.findPatient = (patientName) => {
    //         var params = {};
    //         params.name = patientName;

    //         $http({
    //             method: "GET",
    //             url: "/find",
    //             params: params
    //         }).then(function mySuccess(response) {
    //             $scope.finededPatient = response.data;
    //         }, function myError(response) {
    //             console.log(response);
    //         });
    //     }
    }

})();










