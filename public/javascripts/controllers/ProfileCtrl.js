
(function () {

    angular.module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl($scope, $http) {

        $scope.init = (user) => { 
        }


        $scope.changePersonalData = (personal) => {

            // let personalDataObj = {
            //     _id: $scope.loggedInUser._id,
            //     data: personal,
            // };

            // $http({
            //     method: 'POST',
            //     url: '/user/change-personal-data',
            //     data: { personalDataObj }
            // }).then(function successCallback(response) {
            //     $scope.info = response.data;
            // }, function errorCallback(response) {
            // });
        }

        $scope.changePassword = (passw) => {
        //     var ok = true;

        //     if (passw.password === passw.confirmPassword) {
        //         ok = false;
        //         $scope.infoPass = "Podane hasła nie są takie same";
        //     }

        //     if (ok === true) {
        //         let newPassObj = {
        //             _id: $scope.loggedInUser._id,
        //             data: passw,
        //         };

        //         $http({
        //             method: 'POST',
        //             url: '/user/change-password',
        //             data: { newPassObj }
        //         }).then(function successCallback(response) {
        //             $scope.info = response.data;
        //         }, function errorCallback(response) {
        //         });
        //     }
        }

        $scope.changeAddressEmail = (email) => {
            // let newEmailObj = {
            //     _id: $scope.loggedInUser._id,
            //     data: email
            // };

            // $http({
            //     method: 'POST',
            //     url: '/user/change-address-email',
            //     data: { newEmailObj }
            // }).then(function successCallback(response) {
            //     $scope.info = response.data;
            // }, function errorCallback(response) {
            // });
        }









    };

})();