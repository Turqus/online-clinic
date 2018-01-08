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
            patient: req.user.firstName + ' ' + req.user.surname,
            patientID: req.user._id
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




// router.get('/list-of-dates', (req, res) => {

//   Calendar.find({ doctorID: ObjectID('5a31392cc99fe923c0810096') })
//     .then((calendars) => {
//       console.log(calendars)
//       res.send(calendars)
//     })
//     .catch((err) => {
//       console.log(err)
//     })

// });












module.exports = router;







        // Calendar.findOneAndUpdate({ doctorID: req.body.calendarObj._id },
        //   {
        //     $set: {
        //       calendar: req.body.calendarObj.calendar,
        //     }
        //   },
        //   {
        //     upsert: true
        //   },
        //   ((err, newCalendar) => {
        //     if (err) res.send('errror')
        //     else {
        //       res.send(newCalendar)
        //     }
        //   })
        // )




        //         // ----
        // Calendar.findOneAndUpdate({ doctorID: req.body.calendarObj._id },
        //   { 
        //     // $push: { time: { hour : calendarObj.date.hour, reserved: true, patient: 'patient'  } } 
        //      $addToSet: { time: { hour : calendarObj.date.hour, reserved: true, patient: 'patient'  } }
        //   },
        //   {
        //     upsert: true
        //   },
        //   ((err, newCalendar) => {
        //     if (err) res.send('errror')
        //     else {
        //       res.send(newCalendar)
        //     }
        //   })
        // )
        // // ----