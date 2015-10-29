// Google OAuth Configuration
var googleConfig = {
  clientID: '407717796667-sh0t4hgem57ogpbu54rcqamf1tdv16rb.apps.googleusercontent.com',
  clientSecret: 'cT0Ph6uvCpsg5RODBhhKh56O',
  calendarId: '15dcnca6hga2rqna9f651qc5d0@group.calendar.google.com',
  redirectURL: 'http://localhost:2002/auth'
};


// Dependency setup
var express = require('express'),
  moment = require('moment'),
  google = require('googleapis');

// Initialization
var app = express(),
  calendar = google.calendar('v3');
  oAuthClient = new google.auth.OAuth2(googleConfig.clientID, googleConfig.clientSecret, googleConfig.redirectURL),
  authed = false;

// Response for localhost:2002/
app.get('/', function(req, res) {

  // If we're not authenticated, fire off the OAuth flow
  if (!authed) {

    // Generate an OAuth URL and redirect there
    var url = oAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/calendar.readonly'
    });
    res.redirect(url);
  } else {

      // Format today's date
      var today = moment().format('YYYY-MM-DD') + 'T';

      // Call google to fetch events for today on our calendar
      calendar.events.list({
        calendarId: googleConfig.calendarId,
        maxResults: 20,
        timeMin: today + '00:00:00.000Z',
        timeMax: today + '23:59:59.000Z',
        auth: oAuthClient
      }, function(err, events) {
        if(err) {
          console.log('Error fetching events');
          console.log(err);
        } else {

          // Send our JSON response back to the browser
          console.log('Successfully fetched events');
          res.send(events);
        }
      });
  }
});

// Return point for oAuth flow, should match googleConfig.redirectURL
app.get('/auth', function(req, res) {

    var code = req.param('code');

    if(code) {
      // Get an access token based on our OAuth code
      oAuthClient.getToken(code, function(err, tokens) {

        if (err) {
          console.log('Error authenticating')
          console.log(err);
        } else {
          console.log('Successfully authenticated');
          console.log(tokens);
          
          // Store our credentials and redirect back to our main page
          oAuthClient.setCredentials(tokens);
          authed = true;
          res.redirect('/');
        }
      });
    } 
});

var server = app.listen(2222, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('************************');
    console.log('Calmapit Server Listening on port ' + port);
    console.log('\nRemember to first start MongoDb server');
    console.log('************************\n');
    console.log('env = ' + app.get('env') +
        '\nport = ' + port +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd() = ' + process.cwd());
  console.log('Listening at http://%s:%s', host, port);
});

