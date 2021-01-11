var express = require('express');
var router = express.Router();
var passport = require('passport') , LocalStrategy = require('passport-local').Strategy;;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Demo Express App' });
});

router.get('/message', (req, res, next) => {
  res.render('index', { title: `Received: ${req.query.text}` });
});

router.post('/', (req, res) => {
  res.send('POST request received');
});

const users = [
  {id: 'tanha', email: 'tanha@ms.com', password: 'pwd'}
]

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    console.log('Local strategy callback')
    if(email === users[0].email && password === users[0].password) {
      console.log('Local strategy returned true')
      return done(null, user)
    }
  }
));

router.post('/login', (req, res, next) => {
  console.log('POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    console.log('passport.authenticate() callback');
    if (!user) { return res.redirect('/login-fail'); }
    req.login(user, (err) => {
      console.log('req.login() callback')
      return res.redirect('/login-good');
    })
  })(req, res, next);
})

router.get('/login-fail', (req, res, next) => {
  res.render('index', { title: 'Failed Authentication' });
});

router.get('/login-good', (req, res, next) => {
  res.render('index', { title: 'You were authenticated & logged in!' });
});



module.exports = router;
