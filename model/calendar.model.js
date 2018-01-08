var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var CalendarSchema = new Schema({
  doctorID: { type: Schema.Types.ObjectId, ref: 'User' },
  doctor: String,
  yyyy: Number,
  mm: Number,
  dd: Number,
  // from: Number,
  // to: Number,
  hour: String,
  reserved: Boolean,
  patient: String,
  patientID: { type: Schema.Types.ObjectId, ref: 'User' },
});


module.exports = mongoose.model('Calendar', CalendarSchema);





// var CalendarSchema = new Schema({
//   doctorID: { type: Schema.Types.ObjectId, ref: 'User' },
//   doctor: String,
//   calendar: [{
//     day: [{
//       yyyy: Number,
//       mm: Number,
//       dd: Number,
//       from: Number,
//       to: Number,
//         time: [{
//             hour : String,
//             reserved : Boolean, 
//             patient: String,
//             // patientID: { type: Schema.Types.ObjectId, ref: 'User' },
//           }]
//     }]
//   }]
// });




// var CalendarSchema = new Schema({
//   doctorID: { type: Schema.Types.ObjectId, ref: 'User' },
//   doctor: String,
//   yyyy: Number,
//   mm: Number,
//   dd: Number,
//   from: Number,
//   to: Number,
//   time: [{
//     hour: String,
//     reserved: Boolean,
//     patient: String,
//     // patientID: { type: Schema.Types.ObjectId, ref: 'User' },
//   }]
// });
