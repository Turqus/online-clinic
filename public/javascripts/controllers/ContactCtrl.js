(function () {

    angular.module('app', ['720kb.datepicker'])
        .controller('ContactCtrl', ContactCtrl);

    function ContactCtrl($scope, $http, $location) {

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
                $scope.info = response.data;
            }, function errorCallback(response) {
                console.log(response, 'error')
            });
        }
    }

})();










