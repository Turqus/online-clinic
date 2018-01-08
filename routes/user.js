var express = require('express');
var router = express.Router();


// model
var User = require('../model/user.model');
var Calendar = require('../model/calendar.model');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET LIST appointments */
router.get('/list-appointments', function (req, res) { 
  if(req.query.role === 'patient') {
  Calendar.find({ patientID: req.user._id })
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((err) => {
      console.log(err);
    })
  } else if(req.query.role === 'reception') {
      Calendar.find()
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((err) => {
      console.log(err);
    })
  }

});



/* GET users listing. */
router.get('/patient-card', function (req, res) { 
  User.findById({ _id: req.user._id })
    .exec(function (err, user) {
      if (err) {
        res.status(404).json({
          message: 'Can not download this user-card'
        })
      } else {
        res.json(user.patientCards);
      }
    })
   

});
/* GET users listing. */

router.post('/add-registry', function (req, res, next) {
  var registryObj = req.body.registryObj;

  User.findOneAndUpdate({ _id: registryObj._id },
    {
      $set: {
        ['patientCards.' + registryObj.indexCard + '.registry']: registryObj.registry,
      } 
    },
    {
      upsert: true
    },
    ((err, newUser) => {
      if (err) res.send('errror')
      else { 
        res.send(newUser)
      }
    })
  )
});








// CHANGE DATA 

router.post('/change-personal-data', function (req, res, next) {  

  req.check('firstName', 'Imię jest wymagane.').notEmpty();
  req.check('surname', 'Nazwisko jest wymagane.').notEmpty();
  req.check('city', 'Miasto jest wymagane.').notEmpty();
  req.check('country', 'Państwo jest wymagane.').notEmpty();
  req.check('phone', 'Numer telefonu jest wymagane.').notEmpty(); 

  req.check('firstName', 'Za krótkie imię.').isLength({min: 3});
  req.check('surname', 'Za krótkie nazwisko.').isLength({min: 3});
  req.check('city', 'Za krótkie miasto.').isLength({min: 3});
  req.check('country', 'Za krótkie państwo.').isLength({min: 3});
  req.check('phone', 'Za krótki numer telefonu.').isLength({min: 3}); 

  req.check('firstName', 'Za długie imię.').isLength({max: 50});
  req.check('surname', 'Za długie nazwisko.').isLength({max: 50});
  req.check('city', 'Za długie miasto.').isLength({max: 50});
  req.check('country', 'Za długie państwo.').isLength({max: 50});
  req.check('phone', 'Za długi numer telefonu.').isLength({max: 50}); 


  // req.check('email', 'Email is required').isEmail();
  // req.check('password', 'Password is required').isLength({ min: 4 }).equals(req.body.confirmPassword); 
  var errors = req.validationErrors(true); 

  if (errors) {  
    res.render('profile', {
      errorsPass: null, errors : errors, errorsEmail : null, title : 'Zarządzanie Profilem', error_msg : 'Dane personalne nie zostały zmienione'
    });
  } else {
  User.findOneAndUpdate({ _id: req.user._id },
    {
      $set: {
        firstName: req.body.firstName,
        surname: req.body.surname,
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone
      }
    },
    {
      upsert: true
    },
    ((err) => {
      if (err) {
          req.flash('error_msg', 'Dane personalne nie zostały zmienione'); 
          res.redirect('/'+req.user.username);
      }
      else {
          req.flash('success_msg', 'Dane personalne zostały zmienione'); 
          res.redirect('/'+req.user.username);
      }
    })
  )
}
});

router.post('/change-password', function (req, res, next) { 
  console.log(req.body)

  req.check('oldpassword', 'Stare hasło jest wymagane.').notEmpty();
  req.check('password', 'Hasło nie pasuje do siebie.').equals(req.body.confirmPassword);
  req.check('oldpassword', 'Za krótkie hasło.').isLength({min: 6}); 
  req.check('oldpassword', 'Za długie hasło.').isLength({max: 50}); 

  req.check('password', 'Nowe hasło jest wymagane.').notEmpty();
  req.check('password', 'Za krótkie hasło.').isLength({min: 6}); 
  req.check('password', 'Za długie hasło.').isLength({max: 50}); 

  req.check('confirmPassword', 'Powtórz hasło.').notEmpty();
  req.check('confirmPassword', 'Za krótkie hasło.').isLength({min: 6}); 
  req.check('confirmPassword', 'Za długie hasło.').isLength({max: 50});  

   var errorsPass = req.validationErrors(true);  

  if (errorsPass) { 
    res.render('profile', {
      errorsPass: errorsPass, errors : null, errorsEmail : null, title : 'Zarządzanie Profilem', error_msg : 'Hasło nie zostało zmienione'
    });
  } else {
  User.findOneAndUpdate({ _id: req.user._id },
    {
      $set: {

      }
    },
    {
      upsert: true
    },
    ((err) => {
      if (err) {
          req.flash('error_msg', 'Hasło nie zostało zmienione'); 
          res.redirect('/'+req.user.username);
      }
      else {
          req.flash('success_msg', 'Hasło zostało zmienione'); 
          res.redirect('/'+req.user.username);
      }
    })
  )
  }
});

router.post('/change-email', function (req, res, next) {

  req.check('email', 'Nie wprowadziłeś e-maila').notEmpty();
  req.check('email', 'Niepoprawny adres e-mail.').isEmail();
 
   var errorsEmail = req.validationErrors(true);  
   console.log(errorsEmail)
if(errorsEmail) {    
  res.render('profile', {
      errorsPass: null, errors : null, errorsEmail : errorsEmail, title : 'Zarządzanie Profilem', error_msg : 'Adres e-mail został zmieniony'
    });
} else { 
  User.findOneAndUpdate({ _id: req.user._id },
    {
      $set: {
        email : req.body.email
      }
    },
    {
      upsert: true
    },
    ((err) => {
      if (err) {
          req.flash('error_msg', 'Adres e-mail nie został zmieniony'); 
          res.redirect('/'+req.user.username);
      }
      else {
          req.flash('success_msg', 'Adres e-mail został zmieniony'); 
          res.redirect('/'+req.user.username);
      }
    })
  )
}
});



module.exports = router;

 