const express = require('express');
const app = express();
const admin = require('firebase-admin');
const port = process.env.PORT || 3000;
const sakLocation = process.env.SAK_LOCATION || '/tmp/securetoken.json';
const projectName = process.env.PROJECT_NAME;
let serviceAccount;
try {
  serviceAccount = require(sakLocation);
} catch (e) {
  console.log('Failed to find service Account with error: ' + e);
  process.exit();
}

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectName}.firebaseio.com/`
                "https://chat-mobile-96d57.firebaseio.com"
});

if (!firebaseApp) {
  console.log('Failed to initialise firebase app');
  process.exit();
}

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.get('/verify-id/:token', function(req, res) {
  const idToken = req.params.token;
  if (!idToken) {
    res.status(400).send('Token not provided');
    return;
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      res.json(decodedToken);
    })
    .catch(function(error) {
      res.status(404).send('Token not found or not valid');
    });
});

// These methods are specific to implementation, but can be used as examples on to update the database
app.post('/allowed-user/:email', function(req, res) {
  let email = req.params.email;
  if (!email) {
    res.status(400).send('No email provided');
    return;
  }

  // Firebase doesn't allow periods in it's keys, so replace any periods with commas
  email = email.replace(/\./g, ',');

  admin
    .database()
    .ref(`allowed-users/${email}`)
    .set(true)
    .then(() => res.status(201).send('User added'))
    .catch(err => res.status(500).send(`Error adding user - ${err}`));
});

app.delete('/allowed-user/:email', function(req, res) {
  let email = req.params.email;
  if (!email) {
    res.status(400).send('No email provided');
    return;
  }

  // Firebase doesn't allow periods in it's keys, so replace any periods with commas
  email = email.replace(/\./g, ',');

  admin
    .database()
    .ref(`allowed-users/${email}`)
    .remove()
    .then(() => res.status(204).send())
    .catch(err => res.status(500).send('Failed to add user'));
});

app.put('/verify-user/:userId', function(req, res) {
  const userId = req.params.userId;
  admin
    .auth()
    .updateUser(userId, {
      emailVerified: true
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      res.status(202).json('{success: true}');
    })
    .catch(function(error) {
      res.status(500).json(`{error: ${error}`);
    });
});

app.listen(port, function() {
  console.log(`Listening on port: ${port}`);
});
