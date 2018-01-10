(function () {
    angular.module('app')
        .controller('PatientProfilCtrl', PatientProfilCtrl);

    function PatientProfilCtrl($scope, $http) {

        $scope.init = (patient, doctorName) => {
            $scope.doctorName = doctorName;
            $scope.patient = JSON.parse(patient);
            $scope.card = '0';
            $scope.changeCard(0);
        }
 

        $scope.test = (message, recipient) => {
            if (recipient === 'Recepcji') message.recipient = 'bartlomiejflis94@gmail.com';
            else if (recipient === 'Danuta Antoni') message.recipient = 'bartlomiejflis94@gmail.com';
            else if (recipient === 'Marek Antoni') message.recipient = 'bartlomiejflis94@gmail.com';
            else if (recipient === 'Jakub Antoni') message.recipient = 'bartlomiejflis94@gmail.com';


            $http({
                method: 'POST',
                url: '/contact',
                data: { message }
            }).then(function successCallback(response) {
                console.log('yoyo', response);
            }, function errorCallback(response) {
                console.log(response, 'error')
            });
        }

        $scope.addRegistry = (registry) => {
            $scope.patient.patientCards[$scope.selectedCardIndex].registry.unshift({ 'information': registry, 'doctor': $scope.doctorName, 'created': new Date() });

            let registryObj = {
                _id: $scope.patient._id,
                registry: $scope.patient.patientCards[$scope.selectedCardIndex].registry,
                indexCard: $scope.selectedCardIndex
            };

            $http({
                method: 'POST',
                url: '/user/add-registry',
                data: { registryObj }
            }).then(function successCallback(response) {
                $scope.registry = '';
            }, function errorCallback(response) {
                console.log(response, 'error')
            });
        }


        $scope.changeCard = (indexCard) => {
            $scope.selectedCardIndex = indexCard;
            $scope.selectedCard = $scope.patient.patientCards[indexCard].registry;

        }
    }
})();





 