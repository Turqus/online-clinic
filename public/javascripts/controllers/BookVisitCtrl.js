
(function () {

    angular.module('app')
        .controller('BookVisitCtrl', BookVisitCtrl);

    function BookVisitCtrl($scope, $http) {

        $scope.init = (doctorID, doctorName) => {
 

            $scope.doctorID = doctorID;
            $scope.doctorName = doctorName;
            // console.log(doctorID)
            // $scope.checkingDeadlines();

            $scope.hoursOfAdmission = [
                { "from": "8:00" },
                { "from": "8:30" },
                { "from": " 9:00" },
                { "from": "9:30" },
                { "from": "10:00" },
                { "from": "10:30" },
                { "from": "11:00" },
                { "from": "11:30" },
                { "from": "13:30" }
            ]

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();

            if (dd === 1) {
                if (mm === 1) mm = 12; yyyy = yyyy - 1;
                dd = daysInMonth(mm, yyyy);
            } else if (dd !== 1) dd = dd - 1;

            $scope.dateFrom = yyyy + '-' + mm + '-' + dd;

            yyyy = today.getFullYear();
            dd = today.getDate();
            mm = today.getMonth() + 1;

            if (mm == 12) {
                yyyy = yyyy + 1;
                mm = 1;
            }

            $scope.dateTo = yyyy + '-' + mm + '-' + dd;



            function daysInMonth(month, year) {
                return new Date(year, month, 0).getDate();
            }


            // $scope.doctorName = doctorName;
            // $scope.patient = JSON.parse(patient);
            // $scope.card = '0';
            // $scope.changeCard(0);
        }

 




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



        // ----


        // $scope.checkingDeadlines = () => {

        //     $http({
        //         method: "GET",
        //         url: "/calendar/list-of-dates",
        //         params: { doctorID: $scope.doctorID }
        //     }).then(function mySuccess(response) {
        //         $scope.calendar = response.data[0];
        //         console.log($scope.calendar)
        //     }, function myError(response) {
        //         console.log(response)
        //     });
        // }



        $scope.bookVisit = (dateVisit) => {
            $scope.error = {};
            $scope.error.ok = true;

            if (validateDate(dateVisit.dateOfTheVisit) === false) {
                $scope.error.date = { "name": "Została wprowadzona nieprawidłowa data" };
                $scope.error.ok = false;
            }

            if ($scope.error.ok === true) {
                var date = new Date(dateVisit.dateOfTheVisit);
                var dd = date.getDate();
                var mm = date.getMonth() + 1;
                var yyyy = date.getFullYear();

                var hour = dateVisit.timeOfTheVisit;


                let calendarObj = {
                    _id: $scope.doctorID,
                    doctorName: $scope.doctorName,
                    date: { dd: dd, mm: mm, yyyy: yyyy, hour: hour }
                }; 

                $http({
                    method: 'POST',
                    url: '/calendar/book-a-date',
                    data: { calendarObj }
                }).then(function successCallback(response) {
                    $scope.info = response.data;
                }, function errorCallback(response) {
                });
            }
        }

        function validateDate(dateVisit) {
            var dateActual = new Date();
            dateActual.yyyy = dateActual.getFullYear();
            dateActual.mm = dateActual.getMonth() + 1;
            dateActual.dd = dateActual.getDate();

            var date = new Date(dateVisit);
            var yyyy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();

            if (dd >= dateActual.dd && dateActual.yyyy === yyyy || dateActual.yyyy + 1 === yyyy && dateActual.mm === mm || dateActual.mm + 1 === mm && mm < 13 || mm === 1) {
                return true;
            } else {
                return false;
            }
        }
    }

})();



            // var filtered = $scope.calendar.calendar.filter((item, index) => {
            //     console.log(item.day.dd == dd && item.day.mm == mm && item.day.yyyy == yyyy)
            // }) 

            // $scope.calendar.calendar.push( {day : { yyyy : yyyy, mm : mm, dd : dd, time : [{hour : hour, reserved : true, patient : 'Bartlomiej'}]  }}); 
