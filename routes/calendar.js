var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectId;
// model
var User = require('../model/user.model');
var Calendar = require('../model/calendar.model');


//RESERVATE visit
router.post('/book-a-date', (req, res) => {
  var calendarObj = req.body.calendarObj;

  Calendar.count({
    $and: [
      { doctorID: ObjectID(calendarObj._id) },
      { yyyy: calendarObj.date.yyyy },
      { mm: calendarObj.date.mm },
      { dd: calendarObj.date.dd },
      { hour: calendarObj.date.hour }
    ]
  })
    .then((number) => {
      if (number != 0) {
        res.json('Ten termin jest zajęty')
      } else {
        var newVisit = {
          doctorID: ObjectID(calendarObj._id),
          doctor: calendarObj.doctorName,
          yyyy: calendarObj.date.yyyy,
          mm: calendarObj.date.mm,
          dd: calendarObj.date.dd,
          hour: calendarObj.date.hour,
          reserved: true,
          patient: req.user.firstName + ' ' + req.user.surname,
          patientID: req.user._id
        }

        var calendar = new Calendar(newVisit);

        calendar.save()
          .then(function (calendars) {
            res.json('Termin wizyty został zapisany')
          })
          .catch((err) => {
            res.json('Termin wizyty nie został zapisany')
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
});

// CHANGE A DATE 
router.post('/change-a-date', (req, res) => {
  var calendarObj = req.body.calendarObj;

  Calendar.count({
    $and: [
      { doctorID: ObjectID(calendarObj._id) },
      { yyyy: calendarObj.date.yyyy },
      { mm: calendarObj.date.mm },
      { dd: calendarObj.date.dd },
      { hour: calendarObj.date.hour }
    ]
  })
    .then((number) => {
      if (number != 0) {
        res.json('Ten termin jest zajęty')
      } else {

        Calendar.findByIdAndRemove(ObjectID(calendarObj.idOfAnEarlierVisit), (err) => {
          if (err) console.log(err)
        }).then(() => {
          var newVisit = {
            doctorID: ObjectID(calendarObj._id),
            doctor: calendarObj.doctorName,
            yyyy: calendarObj.date.yyyy,
            mm: calendarObj.date.mm,
            dd: calendarObj.date.dd,
            hour: calendarObj.date.hour,
            reserved: true,
            patient: calendarObj.patient,
            patientID: calendarObj.patientID
          }

          var calendar = new Calendar(newVisit);

          calendar.save()
            .then(function (calendars) {
            res.json('Termin wizyty został zmieniony')
            })
            .catch((err) => {
            res.json('Termin wizyty nie został zmieniony')
            })

        })
      }
    })
    .catch((err) => {
      console.log(err)
    })

});
 
module.exports = router;




 