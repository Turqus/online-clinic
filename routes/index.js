var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');



// model
var User = require('../model/user.model');
var Calendar = require('../model/calendar.model');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: req.user, title: 'Przychodnia Online' });
});

//MAP
router.get('/map', function (req, res) {
  res.render('map', { title: 'Mapa Dojazdu' })
});


//PATIENT CARD
router.get('/patient-card', function (req, res) {
  if(req.user && req.user.role === 'patient') {
  res.render('patient-card', { title: 'Karta Pacjenta' });
  } else {
    res.redirect('/login');
  }
});


//SEARCH PATIENT
router.get('/find-patient', function (req, res) {
  if(req.user && req.user.role === 'doctor') {
    res.render('find-patient', { title: 'Znajdź Pacjenta' });
  } else {
    res.redirect('/login');
  }
});

router.get('/find', (req, res) => { 
  if(req.user && req.user.role === 'doctor') {
            var textSearch = req.query.name;
    var query = {};

    if (textSearch != '') {
    query.$or = [
      { firstName: { $regex: '.*' + textSearch + '.*' } },
      { surname: { $regex: '.*' + textSearch + '.*' } },
      { city: { $regex: '.*' + textSearch + '.*' } },
      { country: { $regex: '.*' + textSearch + '.*' } },
      { phone: { $regex: '.*' + textSearch + '.*' } },
      { email: { $regex: '.*' + textSearch + '.*' } }
    ];


    User.find(query)
    .exec(function (err, user) {
      if (err) {
        res.status(404).json({
          message: 'Can not download this user'
        })
      } else {  
        res.json(user);
      }
    })
  }
  } else {
    res.redirect('/');
  }
 
})


router.get('/find-patient/:id', function (req, res, next) {
  if(req.user && req.user.role === 'doctor') {
      User.findById(req.params.id)
    .then((patient) => {
      console.log(req.user)
      return res.render('patient-profil-panel', { title: 'Panel Użytkownika', patient : patient, doctorName : req.user.firstName + ' ' + req.user.surname });
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
    res.redirect('/');
  }
})

//END SEARCH PATIENT

 
//CONTACT WITH SPECIALIST && RECEPTION

router.get('/contact-with-marek-antoni', function (req, res) {
  res.render('contact', { title: 'Kontakt ze specjalistą', recipient: 'Marek Antoni', email: 'xxx@o2.pl' })
});

router.get('/contact-with-jakub-antoni', function (req, res) {
  res.render('contact', { title: 'Kontakt ze specjalistą', recipient: 'Jakub Antoni', email: 'xxx@o2.pl' })
});

router.get('/contact-with-danuta-antoni', function (req, res) {
  res.render('contact', { title: 'Kontakt ze specjalistą', recipient: 'Danuta Antoni', email: 'xxx@o2.pl' })
});

router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Kontakt z recepcją', recipient: 'Recepcji', email: 'xxx@o2.pl' })
});

//sending email
router.post('/contact', (req, res) => { 
 var message = req.body.message;
 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'turqus18@gmail.com',
      pass: 'Chudy129'
    }
  });
 
  var mailOptions = {
    from: 'turqus18@gmail.com',
    to: message.recipient,
    subject: message.title,
    html: '<b>E-mail Kontaktowy: </b>' + message.email + '<br><br>' + '<b>Imie i Nazwisko: </b>' + message.name + '<br><br>' + '<b>Wiadomość: </b>' + message.text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json('Wiadomość nie zostałą wysłana.');
    } else {
      console.log('Email sent: ' + info.response);
      res.json('Wiadomość została wysłana.');
    }
  });
});

//end sending email

//END CONTACT WITH SPECIALIST && RECEPTION


//DOCTORS
router.get('/marek-antoni', function (req, res, next) {
  res.render('doctors/marek-antoni', { title: 'Lekarz' });
});


router.get('/jakub-antoni', function (req, res, next) {
  res.render('doctors/jakub-antoni', { title: 'Lekarz' });
});


router.get('/danuta-antoni', function (req, res, next) {
  res.render('doctors/danuta-antoni', { title: 'Lekarz' });
});
//END DOCTORS

//DOCTORS  RESERVATION VISIT
router.get('/marek-antoni/reservation-visit', function (req, res, next) {
  if(req.user) {
    res.render('reservation-visit', { title: 'Rezerwacja Wizyty', doctorID : '5a54b2997ae86414d86b598a', doctorName : 'Marek Antoni' });
  } else {
    res.redirect('/login');
  }
});


router.get('/jakub-antoni/reservation-visit', function (req, res, next) {
  if(req.user) {
    res.render('reservation-visit', { title: 'Rezerwacja Wizyty', doctorID : 'dont exists account', doctorName : 'Jakub Antoni'  });
  } else {
    res.redirect('/login');
  }
});


router.get('/danuta-antoni/reservation-visit', function (req, res, next) {
  if(req.user) {
     res.render('reservation-visit', { title: 'Rezerwacja Wizyty', doctorID : 'dont exists account', doctorName : 'Danuta Antoni'  });
  } else {
    res.redirect('/login');
  }
}); 

//END DOCTORS RESERVATION VISIT

/* GET REGISTER page. */
router.get('/register', function (req, res) {
  res.render('register', { title: 'Rejestracja' })
});


/* GET LOGIN page. */
router.get('/login', function (req, res) {
  res.render('login', { title: 'Logowanie' })
});


//TREATMENTS

router.get('/marek-treatments', function (req, res) {
  res.render('treatments/marek-treatments', { title: 'Zabiegi wykonywant przez Marek Antoni' })
});

router.get('/jakub-treatments', function (req, res) {
  res.render('treatments/jakub-treatments', { title: 'Zabiegi wykonywant przez Jakub Antoni' })
});

router.get('/danuta-treatments', function (req, res) {
  res.render('treatments/danuta-treatments', { title: 'Zabiegi wykonywant przez Danute Antoni' })
});

//END TREATMENTS

//CLINICS


router.get('/surgery', function (req, res) {
  res.render('clinics/surgery', { title: 'Poradnia Chirurgi Ogólnej' })
});


router.get('/cardiac', function (req, res) {
  res.render('clinics/cardiac', { title: 'Poradnia Kardiologiczna' })
});


router.get('/occupational-medicine', function (req, res) {
  res.render('clinics/occupational-medicine', { title: 'Poradnia Medycyny Pracy' })
});

//END CLINICS

//visits-to-the-doctor
router.get('/reception/visits-to-the-doctor', (req, res)=>{ 
  res.render('visits-to-the-doctor', { title: 'Umówione Wizyty' })
});


// PROFIL USER
router.get('/:username', function (req, res, next) {  
  var error = {}; 
  if(!req.user || req.user.username != req.params.username) {
    res.redirect('/login');
  } else {
  User.findById(req.user._id)
    .then((user) => {
      return res.render('profile', { title: 'Panel Użytkownika', user: user, errors : null, errorsPass : null, errorsEmail : null });
    })
    .catch((err) => {
      error.status = 404;
      errror.message = "Użytkownika nie znaleziono.";
      return res.render('error', { title: 'Błąd 404', error : error }); 
    })
  }
});


// appointments
router.get('/:username/appointments', function (req, res, next) {
  if(req.user && req.user.role === 'patient') {
  res.render('appointments', { title: 'Umówione Wizyty' })
  } else {
    res.redirect('/login');
  }
});

// changing time of appointments
router.get('/:username/change-appointments/:id', function (req, res, next) {
  if(req.user && req.user.role === 'patient' || req.user.role === 'reception') {
  Calendar.findById(req.params.id)
  .then((visit)=>{
    res.render('change-appointments', { title: 'Zmiana Umówionej Wizyty', visit : visit })
  })
  .catch((err)=>{
    console.log(err)
  })
  } else {
    res.redirect('/login');
  }

});
//profil user END

module.exports = router;
