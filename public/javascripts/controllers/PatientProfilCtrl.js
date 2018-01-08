



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

        $scope.toggle = false;

        $scope.expandMenu = (name) => {

            if ($scope.toggle == true && $scope.currentlyMenu == name) {
                $scope.toggle = !$scope.toggle;
            } else {
                $scope.toggle = true;
            }

            $scope.currentlyMenu = name;
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









            // var today = new Date();
            // var rok = today.getFullYear();
            // var mies = today.getMonth() + 1;


            // function maxday(month, year) {
            //     var ndays;
            //     if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) ndays = 31;
            //     else if (month == 4 || month == 6 || month == 9 || month == 11) ndays = 30;
            //     else {
            //         if (year % 4 != 0) ndays = 28;
            //         if (year % 4 == 0) {
            //             if (year % 100 == 0 && year % 400 != 0) ndays = 28;
            //             else ndays = 29;
            //         }

            //     }
            //     return ndays;
            // }

 
            // var today = new Date();
            // var dd = today.getDate();
            // var mm = today.getMonth()+1;
            // var yyyy = today.getFullYear();
            
            // if(dd === 1) {
            //     if(mm === 1) mm = 12; yyyy = yyyy-1;
            //     dd = daysInMonth(mm, yyyy);
            // } else if (dd !== 1) dd = dd-1;

            // $scope.dateFrom = yyyy+'-'+mm+'-'+dd;

            // yyyy = today.getFullYear();
            // dd = today.getDate();
            // mm = today.getMonth()+1;
            
            // if(mm == 12) {
            //      yyyy = yyyy +1;
            //      mm = 1;
            // } 

            // $scope.dateTo = yyyy+'-'+mm+'-'+dd;
            


            // function daysInMonth(month, year) {
            //     return new Date(year, month, 0).getDate();
            // }



            
        // $scope.findPatient = (patientName) => {
        //     var params = {};
        //     params.name = patientName;

        //     $http({
        //         method: "GET",
        //         url: "/find",
        //         params: params
        //     }).then(function mySuccess(response) {
        //         $scope.finededPatient = response.data;
        //     }, function myError(response) {
        //         console.log(response);
        //     });
        // }


        